// ======================================================
// Theme Switch
// ======================================================


const themeButton =
document.getElementById(
"themeButton"
);



function loadTheme(){

    let theme =
    Storage.get(
        "theme",
        "dark"
    );

    if(theme==="light"){
        document.body.classList.add("light");
    }
    else{
        document.body.classList.remove("light");
    }

}



loadTheme();





themeButton
?.addEventListener(
"click",
()=>{


    document.body
    .classList
    .toggle(
        "light"
    );


    let mode =
    document.body
    .classList
    .contains(
        "light"
    )
    ?
    "light"
    :
    "dark";



    Storage.set(
        "theme",
        mode
    );


});