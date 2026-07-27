// ======================================================
// Kanji View Controller
// ======================================================


let currentIndex = 0;

let currentEntry = null;

let answerVisible = false;



document.addEventListener(
"csvLoaded",
()=>{


    loadKanji();


});





function loadKanji(){


    const params =
    new URLSearchParams(
        window.location.search
    );


    let id =
    Number(
        params.get("id")
    );



    if(!id){

        id=1;

    }



    currentIndex =
    kanjiData.findIndex(
        item=>item.no===id
    );



    if(currentIndex<0){

        currentIndex=0;

    }



    showKanji();


}







function showKanji(){

    currentEntry =
    kanjiData[currentIndex];

    if(!currentEntry){
        return;
    }

    const mainElement =
    document.getElementById("mainKanji");
    const kanjiNumberElement =
    document.getElementById("kanjiNumber");
    const wordHGRElement =
    document.getElementById("wordHGR");
    const wordStrokeElement =
    document.getElementById("wordStroke");
    const hiraganaElement =
    document.getElementById("hiragana");
    const meaningElement =
    document.getElementById("meaning");

    if(mainElement){
        mainElement.textContent =
        currentEntry.main;
    }

    if(kanjiNumberElement){
        kanjiNumberElement.textContent =
        `#${currentEntry.no}`;
    }

    if(wordHGRElement){
        wordHGRElement.textContent =
        currentEntry.word;
    }

    if(wordStrokeElement){
        wordStrokeElement.textContent =
        currentEntry.word;
    }

    if(hiraganaElement){
        hiraganaElement.textContent =
        currentEntry.hiragana;
    }

    if(meaningElement){
        meaningElement.textContent =
        currentEntry.meaning;
    }

    updateAnswer();

}





// ==============================
// Answer Control
// ==============================


function updateAnswer(){

    let always =
    Storage.get(
        "alwaysShow",
        false
    );

    const answerArea =
    document.getElementById("answerArea");
    const showAnswerButton =
    document.getElementById("showAnswer");

    if(always || answerVisible){
        if(answerArea){
            answerArea.style.display="block";
        }
        if(showAnswerButton){
            showAnswerButton.style.display="none";
        }
    }
    else{
        if(answerArea){
            answerArea.style.display="none";
        }
        if(showAnswerButton){
            showAnswerButton.style.display="block";
        }
    }

}






document
.getElementById("showAnswer")
?.addEventListener(
"click",
()=>{


    answerVisible=true;


    updateAnswer();


});





// ==============================
// Always Show Checkbox
// ==============================


const checkbox =
document.getElementById(
"alwaysShow"
);



if(checkbox){


checkbox.checked =
Storage.get(
"alwaysShow",
false
);



checkbox.addEventListener(
"change",
()=>{


    Storage.set(
        "alwaysShow",
        checkbox.checked
    );


    answerVisible=false;


    updateAnswer();


});



}





// ==============================
// Navigation
// ==============================


function openIndex(){


    location.href =
    "index.html";


}



document
.getElementById("homeButton")
?.addEventListener(
"click",
openIndex
);







document
.getElementById("previousButton")
?.addEventListener(
"click",
()=>{


    if(currentIndex>0){

        currentIndex--;

        changeURL();

    }


});







document
.getElementById("nextButton")
?.addEventListener(
"click",
()=>{


    if(currentIndex <
       kanjiData.length-1){

        currentIndex++;

        changeURL();

    }


});







function changeURL(){


    location.href =
    `kanji.html?id=${
        kanjiData[currentIndex].no
    }`;

}





// ==============================
// Random
// ==============================


document
.getElementById("randomButton")
?.addEventListener(
"click",
()=>{


    currentIndex =
    Math.floor(
        Math.random()
        *
        kanjiData.length
    );



    changeURL();


});


document
.getElementById("indexButton")
?.addEventListener(
"click",
()=>{

    location.href =
    "../index.html";

});

