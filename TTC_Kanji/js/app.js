let kanjiData = [];


// Load CSV file

fetch("data/kanji.csv")

.then(response => response.text())

.then(data => {


    let rows = data.trim().split("\n");


    rows.forEach(row => {


        let col = row.split(",");


        if(col.length >= 5){


            kanjiData.push({

                kanji: col[0],
                meaning: col[1],
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