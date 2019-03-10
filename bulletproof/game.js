var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth - 50;
ctx.canvas.height = window.innerHeight - 75;

document.onkeydown = keyDownHandler;
document.onkeyup = keyUpHandler;

var easyPlayers = [];
var mediumPlayers = [];
var hardPlayers = [];
var insanePlayers = [];

var aireference = [];

var seconds = 0;
var start = Date.now();

bounce = new sound("blank");

var changes = 0;
var difference = 0;
var speed = 8;
var initspeed = 8;

var es = 0;
var ms = 0;
var hs = 0;
var is = 0;



wave1 = false;
wave2 = false;
wave3 = false;
wave4 = false;
wave5 = false;
wave6 = false;
wave7 = false;
wave8 = false;
wave9 = false;
wave10 = false;
wave11 = false;
wave12 = false;
wave13 = false;
wave14 = false;
wave15 = false;
wave16 = false;
wave17 = false;
wave18 = false;
wave19 = false;
wave20 = false;

wave = 0;



function update() {
    move();
    easyPlayers.forEach(function(e) {
        aireference.push(e);
        e.update();
    });
    mediumPlayers.forEach(function(e) {
        aireference.push(e);
        e.update();
    });
    hardPlayers.forEach(function(e) {
        aireference.push(e);
        e.update();
    });
    insanePlayers.forEach(function(e) {
        aireference.push(e);
        e.update();
    });
    playerCollider();
    ballCollider();
    checkReload();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw();

    easyPlayers.forEach(function(e) {
        e.draw();
    });
    mediumPlayers.forEach(function(e) {
        e.draw();
    });
    hardPlayers.forEach(function(e) {
        e.draw();
    });
    insanePlayers.forEach(function(e) {
        e.draw();
    });


    seconds = Math.floor((Date.now() - start) / 1000);
    createText("Time lapsed: " + seconds, 10, 25, "30px Arial", "#ffa3a3");
    createText("Wave: " + wave, canvas.width - 125, 25, "30px Arial", "#ffa3a3");

    //first 5,  increments of 15, slowly  builds  up
    if (!wave1) {
        var e = returnRandom(1, 2);
        es += e;
        newWave(e, 0, 0, 0);
        wave1 = true;
        wave += 1;
    } else if (!wave2 && seconds == 15) {

        var e = returnRandom(1, 3);
        es += e;
        newWave(e, 0, 0, 0);
        wave2 = true;
        wave += 1;
    } else if (!wave3 && seconds == 30) {

        var m = returnRandom(1, 2);
        ms += m;
        newWave(0, m, 0, 0);
        wave3 = true;
        wave += 1;
    } else if (!wave4 && seconds == 45) {

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 2);
        es += e;
        ms += m;
        newWave(e, m, 0, 0);
        wave4 = true;
        wave += 1;
    } else if (!wave5 && seconds == 60) {

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 2);

        es += e;
        ms += m;

        newWave(e, m, 0, 0);
        wave5 = true;
        wave += 1;
    }

    //second 5, increments of 10, introduce hard, add way more.
    else if (!wave6 && seconds == 70) {

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 2);
        var h = returnRandom(1, 2);

        es += e;
        ms += m;
        hs += h;

        newWave(e, m, h, 0);
        wave6 = true;
        wave += 1;
    } else if (!wave7 && seconds == 80) {

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 3);

        es += e;
        ms += m;

        newWave(e, m, 0, 0);
        wave7 = true;
        wave += 1;
    } else if (!wave8 && seconds == 90) {

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 2);
        var h = returnRandom(1, 2);

        es += e;
        hs += h;
        ms += m;
        newWave(e, h, m, 0);
        wave8 = true;
        wave += 1;
    } else if (!wave9 && seconds == 100) {

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 2);
        es += e;
        ms += m;
        newWave(e, m, 0, 0);
        wave9 = true;
        wave += 1;
    } else if (!wave10 && seconds == 110) {

        var e = returnRandom(1, 5);
        var m = returnRandom(1, 2);
        var h = returnRandom(1, 2);
        es += e;
        ms += m;
        hs += h;
        newWave(e, m, h, 0);
        wave10 = true;
        wave += 1;
    }

    //third 5, increments of 8, introduce insane at end, chance for a s peed change
    else if (!wave11 && seconds == 118) {
        swi = returnRandom(1, 2);
        if (swi == 1) {
            rand = returnRandom(1, 2);
            speed -= rand
            difference += rand;
            changes += 1;
        }

        var e = returnRandom(1, 2);
        var m = returnRandom(1, 2);
        var h = returnRandom(1, 2);
        es += e;
        ms += m;
        hs += h;
        newWave(e, m, h, 0);
        wave11 = true;
        wave += 1;
    } else if (!wave12 && seconds == 126) {

        var m = returnRandom(1, 5);
        ms += m;
        newWave(0, m, 0, 0);
        wave12 = true;
        wave += 1;
    }
    //easy wave
    else if (!wave13 && seconds == 134) {

        var e = returnRandom(1, 2);
        es += e;
        newWave(e, 0, 0, 0);
        wave13 = true;
        wave += 1;
    } else if (!wave14 && seconds == 142) {

        var h = returnRandom(1, 3);
        hs += h;
        newWave(0, 0, h, 0);
        wave14 = true;
        wave += 1;
    } else if (!wave15 && seconds == 150) {

        var i = returnRandom(1, 2);
        is += i;
        newWave(0, 0, 0, i);
        wave15 = true;
        wave += 1;
    }

    //final 5, increments of 6, more insanes, definite change of speed
    else if (!wave16 && seconds == 156) {

        var e = returnRandom(1, 5);
        var m = returnRandom(1, 2);
        var h = returnRandom(1, 2);
        var i = returnRandom(1, 2);
        es += e;
        ms += m;
        hs += h;
        is += i;
        newWave(e, m, h, i);
        wave16 = true;
        wave += 1;
        speed -= 1;
        difference += 1;
    } else if (!wave17 && seconds == 162) {

        var h = returnRandom(1, 2);
        var i = returnRandom(1, 2);
        hs += h;
        is += i;
        newWave(0, 0, h, i);
        wave17 = true;
        wave += 1;
    } else if (!wave18 && seconds == 168) {

        var h = returnRandom(1, 3);
        var i = returnRandom(1, 2);
        hs += h;
        is += i;
        newWave(0, 0, h, i);
        wave18 = true;
        wave += 1;
    } else if (!wave19 && seconds == 174) {

        var m = returnRandom(1, 2);
        var i = returnRandom(1, 2);
        ms += m;
        is += i;
        newWave(0, m, 0, i);
        wave19 = true;
        wave += 1;
    } else if (!wave20 && seconds == 180) {

        var e = returnRandom(1, 10);
        var h = returnRandom(1, 5);
        var i = returnRandom(1, 2);
        es += e;
        hs += h;
        is += i;
        newWave(e, 0, h, i);
        wave20 = true;
        wave += 1;
    } else if (wave20 && seconds == 190) {
        win();
    }

}

var cursor = {
    'rightPressed': false,
    'leftPressed': false,
    'downPressed': false,
    'upPressed': false,
    'r': false
}

var player = {
    color: "#5f708c",
    x: (canvas.width - 50) / 2,
    y: canvas.height / 2,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
};



function easy(i) {
    var swi = returnRandom(1, 4);
    i.dx = 0;
    i.dy = 0;
    if (swi == 2) {
        i.dx = -3
        i.dy = 3
    } else if (swi == 1) {
        i.dx = 3;
        i.dy = -3
    } else if (swi == 3) {
        i.dx = -3;
        i.dy = 3;
    } else if (swi == 4) {
        i.dx = 3;
        i.dy = -3;
    }

    i.draw = function() {
        if (i.x + i.dx > canvas.width - 10 || i.x + i.dx < 10) {
            bounce.play();
            i.dx = -i.dx;
        }
        if (i.y + i.dy > canvas.height - 10 || i.y + i.dy < 10) {
            bounce.play();
            i.dy = -i.dy;
        }
        ctx.beginPath();
        ctx.fillStyle = "#ffa3a3";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    i.update = function() {
        i.x += i.dx;
        i.y += i.dy;
    }

    return i;

}

// decided to split up into multiple constructors in order to keep it neat. more lines, but easier to handle in the update func
function medium(i) {
    var swi = returnRandom(1, 4);
    i.dx = 0;
    i.dy = 0;
    if (swi == 2) {
        i.dx = -6;
        i.dy = 6;
    }

    if (swi == 1) {
        i.dx = 6;
        i.dy = -6;
    } else if (swi == 3) {
        i.dx = -6;
        i.dy = 6;
    } else if (swi == 4) {
        i.dx = 6;
        i.dy = -6;
    }

    i.draw = function() {
        if (i.x + i.dx > canvas.width - 10 || i.x + i.dx < 10) {
            bounce.play();
            i.dx = -i.dx;
        }
        if (i.y + i.dy > canvas.height - 10 || i.y + i.dy < 10) {
            bounce.play();
            i.dy = -i.dy;
        }
        ctx.beginPath();
        ctx.fillStyle = "#3f915f";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    i.update = function() {
        i.x += i.dx;
        i.y += i.dy;
    }

    return i;

}

function hard(i) {
    var swi = returnRandom(1, 4);
    i.dx = 0;
    i.dy = 0;
    if (swi == 2) {
        i.dx = -14;
        i.dy = 14;
    }

    if (swi == 1) {
        i.dx = 14;
        i.dy = -14;
    } else if (swi == 3) {
        i.dx = -14;
        i.dy = 14;
    } else if (swi == 4) {
        i.dx = 14;
        i.dy = -14;
    }

    i.draw = function() {
        if (i.x + i.dx > canvas.width - 10 || i.x + i.dx < 10) {
            bounce.play();
            i.dx = -i.dx;
        }
        if (i.y + i.dy > canvas.height - 10 || i.y + i.dy < 10) {
            bounce.play();
            i.dy = -i.dy;
        }
        ctx.beginPath();
        ctx.fillStyle = "#4a8cf7";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    i.update = function() {
        i.x += i.dx;
        i.y += i.dy;
    }

    return i;

}

function insane(i) {
    var swi = returnRandom(1, 2);
    i.dx = 0;
    i.dy = 0;
    if (swi == 2) {
        i.dx = -20;
        i.dy = 20;
    }

    if (swi == 1) {
        i.dx = 20;
        i.dy = -20;
    } else if (swi == 3) {
        i.dx = -20;
        i.dy = 20;
    } else if (swi == 4) {
        i.dx = 20;
        i.dy = -20;
    }

    i.draw = function() {
        if (i.x + i.dx > canvas.width - 10 || i.x + i.dx < 10) {
            bounce.play();
            i.dx = -i.dx;
        }
        if (i.y + i.dy > canvas.height - 10 || i.y + i.dy < 10) {
            bounce.play();
            i.dy = -i.dy;
        }
        ctx.beginPath();
        ctx.fillStyle = "#7e5f84";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    i.update = function() {
        i.x += i.dx;
        i.y += i.dy;
    }

    return i;

}
// balls of different types will bounce when they collide.
function ballCollider() {
    easyPlayers.forEach(function(a) {
        mediumPlayers.forEach(function(b) {
            if (collides(a, b)) {
                a.dx = -a.dx;
                a.dy = -a.dy;
                b.dx = -b.dx;
                b.dy = -b.dy;
            }
        });
        hardPlayers.forEach(function(b) {
            if (collides(a, b)) {
                a.dx = -a.dx;
                a.dy = -a.dy;
                b.dx = -b.dx;
                b.dy = -b.dy;
            }
        });
        insanePlayers.forEach(function(b) {
            if (collides(a, b)) {
                a.dx = -a.dx;
                a.dy = -a.dy;
                b.dx = -b.dx;
                b.dy = -b.dy;
            }
        })

    });
    mediumPlayers.forEach(function(a) {
        hardPlayers.forEach(function(b) {
            if (collides(a, b)) {
                a.dx = -a.dx;
                a.dy = -a.dy;
                b.dx = -b.dx;
                b.dy = -b.dy;
            }
        });
        insanePlayers.forEach(function(b) {
            if (collides(a, b)) {
                a.dx = -a.dx;
                a.dy = -a.dy;
                b.dx = -b.dx;
                b.dy = -b.dy;
            }
        });
    });
    hardPlayers.forEach(function(a) {
        insanePlayers.forEach(function(b) {
            if (collides(a, b)) {
                a.dx = -a.dx;
                a.dy = -a.dy;
                b.dx = -b.dx;
                b.dy = -b.dy;
            }
        });
    });
    insanePlayers.forEach(function(a) {

    });


}

function playerCollider() {
    easyPlayers.forEach(function(e) {
        if (collides(e, player)) {
            endGame();
        }
    });
    mediumPlayers.forEach(function(e) {
        if (collides(e, player)) {
            endGame();
        }
    });
    hardPlayers.forEach(function(e) {
        if (collides(e, player)) {
            endGame();
        }
    });
    insanePlayers.forEach(function(e) {
        if (collides(e, player)) {
            endGame();
        }
    });
}

function endGame() {
    easyPlayers = [];
    mediumPlayers = [];
    hardPlayers = [];
    insanePlayers = [];

    seconds = 0;
    start = Date.now();


    changes = 0;
    difference = 0;
    speed = 7;
    initspeed = 7;

    es = 0;
    ms = 0;
    hs = 0;
    is = 0;
    wave = 0;
    player.y = canvas.height / 2;
    player.x = (canvas.width - 50) / 2;
    setWaves();
    death = true;
}

function win() {
    clearInterval(startGame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    /*continuing plans:
		x = not added
		y = added


		x - have a random number of enemies generated, then display
		x - have a r button page reload instead of "refresh page to play again"
		x - have a redirect  button
		*/
    var halfconstant = canvas.height / 2 - (canvas.height / 2) / 2;
    var btconst = "#6d6c55";

    createText("Good game!", canvas.width / 2 - 48, halfconstant, "48px x", "#c6bb15");
    createText("Here are some basic stats for you: ", canvas.width / 2 - 30, halfconstant + 25, "15px x", btconst);
    createText("In 3 minutes and 10 seconds you: ", canvas.width / 2 - 49, halfconstant + 75, "18px x", btconst);
    createText("Survived a total of: ", canvas.width / 2 - 10, halfconstant + 125, "18px x", btconst);
    createText(es + " easy enemies", canvas.width / 2 - 4, halfconstant + 145, "18px x", "#ffa3a3");
    createText(ms + " medium enemies", canvas.width / 2 - 12, halfconstant + 165, "18px x", "#3f915f");
    createText(hs + " hard enemies", canvas.width / 2 - 4, halfconstant + 185, "18px x", "#4a8cf7");
    createText(is + " insane enemies", canvas.width / 2 - 5, halfconstant + 205, "18px x", "#7e5f84");

    var diff = initspeed - speed;
    createText("Your player speed was changed by " + diff + "px", canvas.width / 2 - 50, halfconstant + 250, "15px x", btconst);
    createText("Thus, your final velocity was: " + speed + "px per tick", canvas.width / 2 - 60, halfconstant + 268, "15px x", btconst);
    createText("Refresh the page to play again!", canvas.width / 2 - 25, halfconstant + 300, "15px x", btconst);
}

function move() {
    // smoother movement mechanics
    if (cursor.rightPressed && cursor.upPressed && player.x < canvas.width - 10 && player.y > 10) {
        player.x += speed;
        player.y -= speed;
    } else if (cursor.leftPressed && cursor.upPressed && player.x > 10 && player.y > 10) {
        player.x -= speed;
        player.y -= speed;
    } else if (cursor.leftPressed && cursor.downPressed && player.x > 10 && player.y < canvas.height - 10) {
        player.x -= speed;
        player.y += speed;
    } else if (cursor.rightPressed && cursor.downPressed && player.x < canvas.width - 10 && player.y < canvas.height - 10) {
        player.x += speed;
        player.y += speed;
    } else if (cursor.rightPressed && player.x < canvas.width - 10) {
        player.x += speed;
    } else if (cursor.leftPressed && player.x > 10) {
        player.x -= speed;
    } else if (cursor.upPressed && player.y > 10) {
        player.y -= speed;
    } else if (cursor.downPressed && player.y < canvas.height - 10) {
        player.y += speed;
    }
}

function checkReload() {
    if (cursor.r) {
        document.location.reload();
    }
}

function pushEasy() {
    easyPlayers.push(easy({
        x: returnRandom(0, canvas.width - 11),
        y: returnRandom(0, canvas.height - 11)
    }));
}

function pushMedium() {
    mediumPlayers.push(medium({
        x: returnRandom(0, canvas.width - 11),
        y: returnRandom(0, canvas.height - 11)
    }));
}

function pushHard() {
    hardPlayers.push(hard({
        x: returnRandom(0, canvas.width - 11),
        y: returnRandom(0, canvas.height - 11)
    }));
}

function pushInsane() {
    insanePlayers.push(insane({
        x: returnRandom(0, canvas.width - 11),
        y: returnRandom(0, canvas.height - 11)
    }));
}



function newWave(e, m, h, inl) {
    if (!e == 0) {
        for (var i = 0; i < e; i++) {
            pushEasy();
        }
    }
    if (!m == 0) {
        for (var i = 0; i < m; i++) {
            pushMedium();
        }
    }
    if (!h == 0) {
        for (var i = 0; i < h; i++) {
            pushHard();
        }
    }
    if (!i == 0) {
        for (var i = 0; i < inl; i++) {
            pushInsane();
        }
    }
}

function createText(text, x, y, font, color) {
    ctx.beginPath();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.fill();
    ctx.closePath();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}


function keyDownHandler(e) {
    e.preventDefault();
    if (e.keyCode == 39) {
        cursor.rightPressed = true;
    } else if (e.keyCode == 37) {
        cursor.leftPressed = true;
    } else if (e.keyCode == 38) {
        cursor.upPressed = true;
    } else if (e.keyCode == 40) {
        cursor.downPressed = true;
    } else if (e.keyCode == 82) {
        cursor.r = true;
    }
}


function keyUpHandler(e) {
    e.preventDefault();
    if (e.keyCode == 39) {
        cursor.rightPressed = false;
    } else if (e.keyCode == 37) {
        cursor.leftPressed = false;
    } else if (e.keyCode == 38) {
        cursor.upPressed = false;
    } else if (e.keyCode == 40) {
        cursor.downPressed = false;
    } else if (e.keyCode == 82) {
        cursor.r = true;
    }
}


function returnRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function setWaves() {
    wave1 = false;
    wave2 = false;
    wave3 = false;
    wave4 = false;
    wave5 = false;
    wave6 = false;
    wave7 = false;
    wave8 = false;
    wave9 = false;
    wave10 = false;
    wave11 = false;
    wave12 = false;
    wave13 = false;
    wave14 = false;
    wave15 = false;
    wave16 = false;
    wave17 = false;
    wave18 = false;
    wave19 = false;
    wave20 = false;
}



function collides(a, b) {
    return a.x < b.x + 13 && a.x + 13 > b.x && a.y < b.y + 13 && a.y + 13 > b.y;
}

var startGame = setInterval(function() {
    update();
    draw();
}, 1000 / 30);
