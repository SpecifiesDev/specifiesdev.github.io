let q2clicked, q3clicked, q4clicked = false;


$(() => {

    /* The only disadvantage to using github sites is that it's static hosting only.
    *  I did find a service that hosts database-esque files for free, but I won't go through
    *  the process of setting it up since the like function is purely aesthetic and in real-world
    *  deployments through services like Azure // AWS I wouldn't be restricted in this sense
    */

    if(sessionStorage.q2_likes == null || "") {
        sessionStorage.q2_likes = Math.floor(Math.random() * 200);
    } 

    if(sessionStorage.q3_likes == null || "") {
        sessionStorage.q3_likes = Math.floor(Math.random() * 500);
    }

    if(sessionStorage.q4_likes == null || "") {
        sessionStorage.q4_likes = Math.floor(Math.random() * 5000);
    }


    $(".q2").text(`${sessionStorage.q2_likes} Likes`);
    $(".q3").text(`${sessionStorage.q3_likes} Likes`);
    $(".q4").text(aboveLimit(sessionStorage.q4_likes));

    $(".q2-button").click(() => {
        if(!q2clicked) {
            sessionStorage.q2_likes = parseInt(sessionStorage.q2_likes) + 1;
            q2clicked = true;
            $(".q2").text(aboveLimit(sessionStorage.q2_likes));            
        }
    });

    $(".q3-button").click(() => {
        if(!q3clicked) {
            sessionStorage.q3_likes = parseInt(sessionStorage.q3_likes) + 1;
            q3clicked = true;
            $(".q3").text(aboveLimit(sessionStorage.q3_likes));
        }
    });

    $(".q4-button").click(() => {
        if(!q4clicked) {
            sessionStorage.q4_likes = parseInt(sessionStorage.q4_likes) + 1;
            q4clicked = true;
            $(".q4").text(aboveLimit(sessionStorage.q4_likes));
        }
    });





});

function aboveLimit(num) {
    if(num > 999) {
        return `${Math.floor(num/1000)}k Likes`;
    } else {
        return `${num} Likes`;
    }
}
