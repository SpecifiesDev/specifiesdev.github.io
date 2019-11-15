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

    // Set the width to window variables, so that the video matches every resolution (in theory)
    $(".video-control").attr("style", `width: ${window.innerWidth}`);
});


