let kanjiData = [];

// Simple CSV line parser to handle quoted fields with commas
function parseCSVLine(line){
    const result = [];
    let current = "";
    let inQuotes = false;

    for(let i = 0; i < line.length; i++){
        const ch = line[i];
        if(ch === '"'){
            // Handle escaped quote ""
            if(inQuotes && line[i+1] === '"'){
                current += '"';
                i++; // skip the escaped quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if(ch === ',' && !inQuotes){
            result.push(current);
            current = "";
        } else {
            current += ch;
        }
    }

    result.push(current);
    return result;
}


// Load CSV file

fetch("data/kanji.csv")

.then(response => response.text())

.then(data => {


    let rows = data.trim().split("\n");


    rows.forEach(row => {


        let col = parseCSVLine(row);


        if(col.length >= 5){


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

});




// Create kanji number buttons

function createGrid(){


    let grid = document.getElementById("kanjiGrid");


    kanjiData.forEach(k => {


        let div = document.createElement("div");


        div.className = "card";


        div.innerHTML = `

        <div class="number">
        ${k.number}
        </div>

        ${k.kanji}

        `;



        div.onclick = function(){


            openViewer(k.number);


        };



        grid.appendChild(div);


    });



}





function openViewer(number){


    window.location.href =
    "viewer.html?id="+number;


}






function searchNumber(){


    let value =
    document.getElementById("numberSearch").value;



    if(value){


        openViewer(value);


    }


}






function searchKanji(){


    let value =
    document.getElementById("kanjiSearch").value;



    let result =
    kanjiData.find(k=>k.kanji===value);



    if(result){


        openViewer(result.number);


    }

    else{


        alert("Kanji not found");


    }


}