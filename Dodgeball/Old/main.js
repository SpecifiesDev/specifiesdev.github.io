// main.js

var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
ctx.canvas.width = 500;
ctx.canvas.height = 500;

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



var level = new Level(levelDataStructure, ctx);

var mapArray = level.getMapArray();

mapArray.forEach(function (e) {
  e.draw();
});

function update() {

}
function draw() {

}
