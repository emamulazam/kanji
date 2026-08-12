// ======================================================
// Keyboard Shortcut
// ======================================================


document
.addEventListener(
"keydown",
(e)=>{


    switch(e.key){



        // Space
        case " ":

            e.preventDefault();


            document
            .getElementById(
                "showAnswer"
            )
            ?.click();


        break;



        // Left

        case "ArrowLeft":


            document
            .getElementById(
                "previousButton"
            )
            ?.click();


        break;




        // Right

        case "ArrowRight":


            document
            .getElementById(
                "nextButton"
            )
            ?.click();


        break;




        // R random

        case "r":
        case "R":


            document
            .getElementById(
                "randomButton"
            )
            ?.click();


        break;




        // Escape home

        case "Escape":


            location.href=
            "index.html";


        break;



    }



});