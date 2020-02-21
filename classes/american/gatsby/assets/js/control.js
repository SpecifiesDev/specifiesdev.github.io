import { setData } from "https://specifiesdev.github.io/gatsby/assets/js/lib.js";



// on ready, begin
$(() => {

    // Events
    $(".navbar-github").click(() => {
        window.open("https://github.com/SpecifiesDev");
    });

    if(sessionStorage.path == null || "") {
        setData();
    } 
    console.log(sessionStorage.path);
    $(".profile-control").attr("src", sessionStorage.path);
    $(".profile-control").attr("style", "visibility: visible;");

    $(".overlay").attr("style", `width: ${window.innerWidth}`);
});


