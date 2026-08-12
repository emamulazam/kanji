// ======================================================
// CSV Loader
// ======================================================

let kanjiData = [];


async function loadCSV(){

    try{

        const response = await fetch("js/data/kanji.csv");

        const csvText = await response.text();

        kanjiData = parseCSV(csvText);


        console.log(
            "CSV Loaded:",
            kanjiData.length
        );


        document.dispatchEvent(
            new Event("csvLoaded")
        );


    }
    catch(error){

        console.error(
            "CSV Load Error:",
            error
        );

    }

}



// CSV Parser

function parseCSV(text){

    const lines =
        text.trim().split(/\r?\n/);


    let data=[];


    lines.forEach(line=>{


        let row=parseLine(line);


        if(row.length>=6){


            data.push({

                no:Number(row[0]),

                main:row[1],

                word:row[2],

                hiragana:row[3],

                meaning:row[4],

                // sixth column (numeric group / extra number)
                group: row[5] === "" ? null : Number(row[5])


            });

        }


    });


    return data;

}



// Handle commas inside ""

function parseLine(line){

    let result=[];

    let current="";

    let quote=false;


    for(let i=0;i<line.length;i++){

        let char=line[i];


        if(char === '"'){

            if(quote && line[i+1] === '"'){

                current += '"';

                i++;

            }

            else{

                quote=!quote;

            }

        }


        else if(char === "," && !quote){


            result.push(current);

            current="";


        }

        else{

            current+=char;

        }


    }


    result.push(current);


    return result;


}




loadCSV();