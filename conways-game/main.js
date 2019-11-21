let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");

let width = ctx.canvas.width;
let height = ctx.canvas.height;

let objects = [];

$(".navbar-github").click(() => {
    window.open("https://github.com/SpecifiesDev/");
});



for(let i = 0; i < 100; i++) {
    for(let k = 0; k < 50; k++) {
        let randomSeed = Math.floor(Math.random() * 75);
        if(randomSeed > 67) {
            drawObject(i * 11, k * 11);
            objects.push({x: i*11, y: k*11, dead: false});
        }
    }
}

setInterval(() => {
    conwaysGame();
}, 1000);

function drawObject(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "#3a3a3a";
    ctx.rect(x, y, 10, 10);
    ctx.fill();
    ctx.closePath();
}


function intersects(a, b) {
    if(a.x + 11 == b.x && a.y == b.y) {
        return true;
    } else if(a.x - 11 == b.x && a.y == b.y) {
        return true;
    } else if(a.y - 11 == b.y && a.x == b.x) {
        return true;
    } else if(a.y + 11 == b.y && a.x == b.x) {
        return true;
    }
}

function conwaysGame() {
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let temp = objects.filter(function(e) {
        return !e.dead;
    });
    objects = temp;
    objects.forEach((draw) => {
        drawObject(draw.x, draw.y);
    })

    objects.forEach((check) => {
        checkNumber = 0;

        
        objects.forEach((e) => {
            if(!(check == e)) {
                if(intersects(check, e)) {
                    
                    checkNumber += 1;

                }
            }
        });
        
        if(!check.dead) {
            // underpopulation
            if(checkNumber < 2) {
                check.dead = true;
            }
            // overpopulation
            else if(checkNumber > 3) {
                check.dead = true;
            }
            else if(checkNumber < 4 && checkNumber > 1) {
                check.dead = false;
            }
        } else if(check.dead) {
            if(checkNumber == 3) {
                check.dead = false;
            }
        }
    });

    

    console.log("End gen");


}