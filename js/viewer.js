let kanjiData=[];



let currentID=1;




// Load CSV

fetch("data/kanji.csv")

.then(response=>response.text())

.then(data=>{


    let rows=data.trim().split("\n");


    rows.forEach(row=>{


        let col=row.split(",");



        if(col.length>=5){


            kanjiData.push({


                kanji:col[0],

                meaning:col[1],

                stroke:col[3],

                number:Number(col[4])


            });


        }



    });



    let params =
    new URLSearchParams(window.location.search);



    currentID =
    Number(params.get("id")) || 1;



    showKanji();


});







function showKanji(){



    let k =
    kanjiData[currentID-1];



    if(!k)return;



    document.getElementById("viewer").innerHTML=`




    <div class="meaning">

    ${k.meaning}

    </div>





    <div class="kanji stroke">

    ${k.kanji}

    </div>




    <div class="kanji hgrkk">

    ${k.kanji}

    </div>






    <div class="info">

    Kanji Number : ${k.number}

    <br>

    Stroke Count : ${k.stroke}

    </div>






    <div class="navigation">


    <button onclick="previousKanji()">

    ◀ Previous

    </button>



    <button onclick="nextKanji()">

    Next ▶

    </button>



    </div>





    <div class="search-box">


    <input 
    id="jumpNumber"
    placeholder="Kanji number">


    <button onclick="jumpKanji()">

    Go

    </button>


    </div>





    <div class="search-box">


    <input 
    id="jumpKanji"
    placeholder="Kanji">


    <button onclick="jumpByKanji()">

    Go

    </button>


    </div>



    `;



}









function nextKanji(){



    if(currentID < kanjiData.length){


        currentID++;


        updateURL();


    }


}






function previousKanji(){


    if(currentID>1){


        currentID--;


        updateURL();


    }


}






function updateURL(){


    history.pushState(
        null,
        "",
        "?id="+currentID
    );


    showKanji();


}






function jumpKanji(){



    let num =
    Number(
    document.getElementById("jumpNumber").value
    );



    if(num>=1 && num<=kanjiData.length){


        currentID=num;


        updateURL();


    }


}






function jumpByKanji(){


    let text =
    document.getElementById("jumpKanji").value;



    let found =
    kanjiData.find(k=>k.kanji===text);



    if(found){


        currentID=found.number;


        updateURL();


    }


    else{


        alert("Kanji not found");


    }


}






// Keyboard control

document.addEventListener(
"keydown",
function(e){


    if(e.key==="ArrowRight"){


        nextKanji();


    }



    if(e.key==="ArrowLeft"){


        previousKanji();


    }



});