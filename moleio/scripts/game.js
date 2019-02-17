//Main game loop

var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth - 50;
ctx.canvas.height = window.innerHeight - 75;

document.onkeydown = keyDownHandler;
document.onkeyup = keyUpHandler;


var level1 = false;
var level2 = false;
var level3 = false;
var level4 = false;
var level5 = false;
var level6 = false;
var level7 = false;
var level8 = false;
var level9 = false;
var level10 = false;


var tg = [];
tg.push(grass({x: 0, y: 0}));

function update() {

}
function draw() {
	tg[0].drawg();
}

var cursor = {
	'rightPressed' : false,
	'leftPressed': false,
	'downPRessed': false,
	'upPressed': false,
	'r': false
}
var player = {
	color: "#5f708cc",
	x: (canvas.width - 50) / 2,
	y: canvas.height / 2,
	imageEnabled: false,
	imagePath: "/",
	draw : function() {
		if(this.imageEnabled) {
			// load the image to draw
		} else if(!this.imageEnabled) {
			// Draw a simple circle, for the purpose of testing physics.
			ctx.beginPath();
			ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}
	}
 }
 function grass(i) {
 	var imgPath = "./resources/th.png"
 	i.x = 0;
 	i.y = 0;
 	var w = 5;
 	var h = 5; 
 	i.drawg = function() {
 		ctx.drawImage(imgPath, i.x, i.y, i.w, i.h);
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
        } else if(e.keyCode ==  82) {
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
        } else if(e.keyCode == 82) {
            cursor.r = true;
        }
    }

    function collides(a, b) { return a.x < b.x + 13 && a.x + 13 > b.x && a.y < b.y + 13 && a.y + 13 > b.y; }

    var startGame = setInterval(function() {
        update();
        draw();
    }, 1000 / 30);