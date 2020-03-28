
import { Game } from 'https://specifiesdev.github.io/content/bp/components/Game.js';


let canvas;
let ctx;

let game;

// Set up the canvas once the document has loaded
$(document).ready(() => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // set canvas based on window size.
    ctx.canvas.width = window.innerWidth - 50;
    ctx.canvas.height = window.innerHeight -75;

    // Call game
    game = new Game({ctx: ctx, canvas: canvas});
});