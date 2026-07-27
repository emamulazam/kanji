// ======================================================
// Search Engine
// ======================================================


function searchKanji(keyword){


    keyword =
        keyword.trim()
        .toLowerCase();



    if(keyword===""){

        return kanjiData;

    }



    return kanjiData.filter(item=>{


        return (

            item.main
            .toLowerCase()
            .includes(keyword)


            ||

            item.word
            .toLowerCase()
            .includes(keyword)


            ||

            item.hiragana
            .toLowerCase()
            .includes(keyword)


            ||

            item.meaning
            .toLowerCase()
            .includes(keyword)


        );


    });



}



// Highlight

function escapeRegExp(text){
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(text){
    return text.replace(/[&<>"]/g, (char) => {
        switch(char){
            case "&": return "&amp;";
            case "<": return "&lt;";
            case ">": return "&gt;";
            case '"': return "&quot;";
            default: return char;
        }
    });
}

function highlight(text,keyword){

    if(!keyword){
        return escapeHtml(text);
    }

    const splitRegex =
        new RegExp(
            `(${escapeRegExp(keyword)})`,
            "gi"
        );

    const testRegex =
        new RegExp(
            `^${escapeRegExp(keyword)}$`,
            "i"
        );

    return text
        .split(splitRegex)
        .map(part=>{
            if(testRegex.test(part)){
                return `<span class="highlight">${escapeHtml(part)}</span>`;
            }
            return escapeHtml(part);
        })
        .join("");
}