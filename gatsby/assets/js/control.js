import { setData } from "https://specifiesdev.github.io/gatsby/assets/js/lib.js";

// on ready, begin
$(() => {

    // Events
    $(".navbar-github").click(() => {
        window.open("https://github.com/SpecifiesDev");
    });

    // Check and make sure session storage has the path value
    if(sessionStorage.path == null || "") {
        setData().then(() => {
            console.log(sessionStorage.path);
            $(".profile-control").attr("src", sessionStorage.path); 
        });
    } else {
        console.log(`Already : ${sessionStorage.path}`);
        $(".profile-control").attr("src", sessionStorage.path); 
    }
    
    

    
});