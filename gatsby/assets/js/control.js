import { setData } from './loadImageAssets';

$(() => {

    $(".navbar-github").click(() => {
        window.open("https://github.com/SpecifiesDev");
    });


    if(sessionStorage.path == null || "") {
        
        dataControl.setData();
        console.log(sessionStorage.path);
    } else {

    }

    
});