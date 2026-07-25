// ======================================================
// Home Page Controller
// ======================================================


let currentKeyword="";



document.addEventListener(
"csvLoaded",
()=>{


    displayResults(
        kanjiData
    );


});





const searchInput =
document.getElementById(
"searchInput"
);



if(searchInput){


searchInput.addEventListener(
"input",
()=>{


    currentKeyword =
        searchInput.value;



    debounceSearch();



});


}




function debounce(func,delay){


    let timer;


    return function(){


        clearTimeout(timer);


        timer=setTimeout(
            func,
            delay
        );


    }


}




const debounceSearch =
debounce(()=>{


    let result =
    searchKanji(
        currentKeyword
    );


    displayResults(
        result
    );


},200);






function displayResults(data){

    const container =
    document.getElementById(
        "resultList"
    );

    const count =
    document.getElementById(
        "resultCount"
    );

    if(!container){
        return;
    }

    const compactView = true;

    if(count){
        count.textContent =
        `${data.length} Results`;
    }

    container.innerHTML="";

    data.forEach(item=>{

        const card =
        document.createElement(
            "div"
        );
        card.className =
        "resultCard";

        const noElement =
        document.createElement(
            "div"
        );
        noElement.className =
        "resultNo";
        noElement.textContent =
        `No: ${item.no}`;

        const wordElement =
        document.createElement(
            "div"
        );
        wordElement.className =
        "resultWord";
        wordElement.innerHTML =
        highlight(
            item.word,
            currentKeyword
        );

        card.appendChild(noElement);
        card.appendChild(wordElement);

        if(!compactView){
            const kanaElement =
            document.createElement(
                "div"
            );
            kanaElement.className =
            "resultKana";
            kanaElement.textContent =
            item.hiragana;

            const meaningElement =
            document.createElement(
                "div"
            );
            meaningElement.className =
            "resultMeaning";
            meaningElement.textContent =
            item.meaning;

            card.appendChild(kanaElement);
            card.appendChild(meaningElement);
        }

        card.addEventListener(
            "click",
            ()=>{
                location.href =
                `kanji.html?id=${item.no}`;
            }
        );

        container.appendChild(card);

    });

}