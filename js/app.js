let kanjiData = [];
let currentDataset = 'rtk';

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

function init() {
    currentDataset = sessionStorage.getItem('selectedDataset') || 'rtk';
    if (!currentDataset) {
        window.location.href = 'index.html';
        return;
    }

    const datasetTitle = document.getElementById('datasetTitle');
    if (datasetTitle) {
        datasetTitle.textContent = currentDataset.toUpperCase() + ' Kanji List';
    }

    loadCSV();
}

function loadCSV() {
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

            createGrid();
        })
        .catch(error => {
            console.log("CSV loading error:", error);
            document.getElementById('kanjiGrid').innerHTML = `<p style="color: red;">Error loading data: ${error.message}</p>`;
        });
}

function createGrid() {
    let grid = document.getElementById("kanjiGrid");
    grid.innerHTML = '';

    kanjiData.forEach(k => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <div class="number">
            ${k.number}
            </div>
            ${k.kanji}
        `;

        div.onclick = function () {
            openViewer(k.number);
        };

        grid.appendChild(div);
    });
}

function openViewer(number) {
    sessionStorage.setItem('selectedKanji', number);
    window.location.href = "viewer.html?id=" + number;
}

function searchNumber() {
    let value = document.getElementById("numberSearch").value;

    if (value) {
        openViewer(value);
    }
}

function searchKanji() {
    let value = document.getElementById("kanjiSearch").value;
    let result = kanjiData.find(k => k.kanji === value);

    if (result) {
        openViewer(result.number);
    } else {
        alert("Kanji not found");
    }
}

function goHome() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

init();