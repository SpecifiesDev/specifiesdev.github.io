// Grab canvas and context from document
let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");

// Store width variables for easier notation
let width = ctx.canvas.width;
let height = ctx.canvas.width;

let interval;

// Just use some jquery for the onclick because vanilla events are disgusting
$(() => {

    $(document).ready(() => {
        drawAxes();
        graphSine(5, 5, 50, 35, "a b c d e f g h i j k l");
    });

    $(".navbar-github").click(() => {
        window.open("https://github.com/SpecifiesDev");
    });

    $(".checkbox-type").click(() => {
        
        let state = $(".checkbox-type").is(":checked");

        if(state) {
            interval = setInterval(() => {
                draw();
            }, 100);
        } else if(!state) {
            clearInterval(interval);
        }
        
    });
});

// Kind of self explanatory
function drawAxes() {


    ctx.beginPath();
    ctx.strokeStyle = "#3a3a3a";

    ctx.moveTo(0, 250);
    ctx.lineTo(width, 250);

    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);

    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);

    ctx.stroke();

    
}

/**
 * graphPoint(); Function to graph a point on a sine wave.
 * @param radius Radius of the point
 * @param x x position of the point on the canvas 
 * @param y y poisition of the point on the canvas 
 */
function graphPoint(radius, x, y) {

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.fillStyle = "#ffb3d9";
    ctx.fill();

    // Also return a string object of x and y coordinates for parsing.
    return `${x}:${y}`;
}

/**
 * graphSine(); Function to graph a sine wave.
 * @param xOffset Amount to offset the x coordinates
 * @param yOffset Amount to offset the y coordinates
 * @param amplitude Amplitude of the waves
 * @param frequency Frequency of the waves
 * @param text Text to place at points, optional 
 */
function graphSine(xOffset, yOffset, amplitude, frequency, text) {

    console.log(`sine{amp: ${amplitude} freq: ${frequency}}`);
    
    ctx.beginPath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#3a3a3a";


    let x = 4;
    let y = 0;


    // An array containing all x & y positions of the points plotted
    let points = [];

    ctx.moveTo(x, 275);
    while(x < width) {

        y = 250 + amplitude * Math.sin((x + xOffset)/frequency);

        // Limit point frequency
        if(x % 36 == 0) {
            // Store and push the point
            let newPoint = graphPoint(5, x, y);
            points.push(newPoint);
        }

        ctx.lineTo(x, y);

        x++;

        ctx.stroke();
        ctx.save();

        
    }

    // Store a position of the text, so we can keep track as we iterate through the array of points
    let textPosition = 0;

    
    // Loop through the points
    points.forEach((e) => {
        
        // Split the string into an array
        let array = e.split(":");

        // Convert the strings into Integers
        let x = parseInt(array[0]);
        let y = parseInt(array[1]);

        ctx.font = "28px Arial";
        ctx.fillStyle = "#cc9900";




        ctx.fillText(text.charAt(textPosition), x - 3, y - 15);

        textPosition += 1;
        
    });

    

}

let textToAnimate = "a b c d e f g h i j k l m n o p q r s t u v w x y z";
let xoff = 1;
let yoff = 1;
let amp = 5;
let freq = 2;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let lastCharacter = textToAnimate.charAt(textToAnimate.length - 1);
    textToAnimate = textToAnimate.substring(0, textToAnimate.length - 2);

    textToAnimate = `${lastCharacter} ${textToAnimate}`;

    

    if(amp > 160) {
        amp = Math.floor(Math.random() * 50) + 1;
    }
    if(freq > 170) {
        freq = Math.floor(Math.random() * 50) + 1;  
    }

    amp += Math.floor(Math.random() * 3) + 1;
    freq += Math.floor(Math.random() * 3) + 1;

    drawAxes();
    graphSine(xoff, yoff, amp, freq, textToAnimate);
    
}




