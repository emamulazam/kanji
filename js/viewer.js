let kanjiData = [];
let currentID = 1;
let currentDataset = 'rtk';

// Simple CSV line parser to handle quoted fields with commas
function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (ch === ',' && !inQuotes) {
            result.push(current);
            current = "";
        } else {
            current += ch;
        }
    }

    result.push(current);
    return result;
}

// Load CSV based on selected dataset
function loadCSV() {
    currentDataset = sessionStorage.getItem('selectedDataset') || 'rtk';
    if (!currentDataset) {
        window.location.href = 'index.html';
        return;
    }

    const csvPath = `data/${currentDataset}/kanji.csv`;
    
    fetch(csvPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${csvPath}`);
            }
            return response.text();
        })
        .then(data => {
            let rows = data.trim().split("\n");

            rows.forEach(row => {
                let col = parseCSVLine(row);

                if (col.length >= 5) {
                    kanjiData.push({
                        kanji: col[0],
                        meaning: col[1],
                        story: col[2],
                        stroke: col[3],
                        number: Number(col[4])
                    });
                }
            });

            let params = new URLSearchParams(window.location.search);
            currentID = Number(params.get("id")) || 1;

            showKanji();
        })
        .catch(error => {
            console.log("CSV loading error:", error);
            document.getElementById('viewer').innerHTML = `<p style="color: red;">Error loading data: ${error.message}</p>`;
        });
}

function showKanji() {
    let k = kanjiData[currentID - 1];

    if (!k) return;

    document.getElementById("viewer").innerHTML = `
        <div class="meaning">
        ${k.meaning}
        </div>

        <div class="kanji stroke">
        ${k.kanji}
        </div>

        <div class="kanji hgrkk">
        ${k.kanji}
        </div>

        <div class="story">
        ${k.story ? k.story : ""}
        </div>

        <div class="info">
        Kanji Number : ${k.number}
        <br>
        Stroke Count : ${k.stroke}
        </div>

        <div class="navigation">
            <button onclick="previousKanji()">◀ Previous</button>
            <button onclick="nextKanji()">Next ▶</button>
        </div>

        <div class="search-box">
            <input 
            id="jumpNumber"
            placeholder="Kanji number">
            <button onclick="jumpKanji()">Go</button>
        </div>

        <div class="search-box">
            <input 
            id="jumpKanji"
            placeholder="Kanji">
            <button onclick="jumpByKanji()">Go</button>
        </div>
    `;
}

function nextKanji() {
    if (currentID < kanjiData.length) {
        currentID++;
        updateURL();
    }
}

function previousKanji() {
    if (currentID > 1) {
        currentID--;
        updateURL();
    }
}

function updateURL() {
    history.pushState(
        null,
        "",
        "viewer.html?id=" + currentID
    );
    showKanji();
}

function jumpKanji() {
    let num = Number(
        document.getElementById("jumpNumber").value
    );

    if (num >= 1 && num <= kanjiData.length) {
        currentID = num;
        updateURL();
    }
}

function jumpByKanji() {
    let text = document.getElementById("jumpKanji").value;
    let found = kanjiData.find(k => k.kanji === text);

    if (found) {
        currentID = found.number;
        updateURL();
    } else {
        alert("Kanji not found");
    }
}

function goHome() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Keyboard control
document.addEventListener(
    "keydown",
    function (e) {
        if (e.key === "ArrowRight") {
            nextKanji();
        }

        if (e.key === "ArrowLeft") {
            previousKanji();
        }
    }
);

// Initialize when page loads
loadCSV();