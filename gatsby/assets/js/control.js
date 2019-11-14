import { setData } from "https://specifiesdev.github.io/gatsby/assets/js/lib.js";

// Perform before document loads just for visual preference
checkSession();

// on ready, begin
$(() => {

    // Events
    $(".navbar-github").click(() => {
        window.open("https://github.com/SpecifiesDev");
    });



    
});


function checkSession() {
    if(sessionStorage.path == null || "") {
        setData();
    } 
    console.log(sessionStorage.path);
    $(".profile-control").attr("src", sessionStorage.path);    
}