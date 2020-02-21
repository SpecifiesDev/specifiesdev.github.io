// Shorten
let width = window.innerWidth;
let height = window.innerHeight;

// Radius of particle circle
let radius = 250;

// Scale of circle // the max and min it can be
let scale = 2;
let scaleMinimum = 1;
let scaleMaximum = 3;

// Amount of particles
let amount = 250;

// Canvas elements
let canvas;
let ctx;
let particles;

// Set the mouse x and y to middle
let mouseX = (width / 2);
let mouseY = (height / 2);

// Is the mouse down?
let mouseIsDown = false;

// Store interval
let storedInterval;

initiate();

function initiate() {
	canvas = document.getElementById('overlay');

	ctx = canvas.getContext('2d');

	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
	canvas.addEventListener('touchstart', canvasTouchStart, false);
	canvas.addEventListener('touchmove', canvasMove, false);
	window.addEventListener('resize', resizeHandler, false);

	createParticles();

	storedInterval = setInterval(loop, 1000 / 60);
}

function createParticles() {
	particles = [];
	for(let i = 0; i < amount; i++) {
		let particle = {
			position: { x: mouseX, y: mouseY},
			shift: { x: mouseX, y: mouseY},
			size: 10,
			angle: 0,
			speed: 0.01 + Math.random() * 0.04,
			targetSize: 4,
			fillColor: '#7894c2',
			orbit: radius * .5 + (radius * .5 * Math.random())
		};

		let choice = Math.floor(Math.random() * 100);

		if(choice <= 33) {
			particle.fillColor = "#d12695";
		} else if(choice <= 66) {
			particle.fillColor = "#27d6c8";
		}

		particles.push(particle);
	}
}

function mouseMove(e) {
	mouseX = event.clientX - (window.innerWidth - width) * .5;
	mouseY = event.clientY - (window.innerHeight - height) * .5;
}

function mouseDown() {
	mouseIsDown = true;
}

function mouseUp() {
	mouseIsDown = false;
}

function canvasTouchStart(e) {
	if(e.touches.length == 1) {
		e.preventDefault();

		mouseX = e.touches[0].pageX - (window.innerWidth - width) * .5;
		mouseY = e.touches[0].pageY - (window.innerHeight - height) * .5;
	}
}

function canvasMove(e) {
	if(e.touches.length == 1) {
		e.preventDefault();

		mouseX = e.touches[0].pageX - (window.innerWidth - width) * .5;
		mouseY = e.touches[0].pageY - (window.innerHeight - height) * .5;
	}
}

function resizeHandler() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function loop() {
	if(mouseIsDown) scale += ( scaleMaximum - scale ) * (0.02);
	else scale -= ( scale - scaleMinimum ) * (0.02);
	
	
	scale = Math.min( scale, scaleMaximum );
	
	
	ctx.fillStyle = 'rgba(0,0,0, .3)';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	for (let i = 0; i < particles.length; i++) {
		let particle = particles[i];
		
		let location = { x: particle.position.x, y: particle.position.y };
		
		
		particle.angle += particle.speed;
		
		particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
		particle.shift.y += (mouseY - particle.shift.y) * (particle.speed);
		
		particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit * scale);
		particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit * scale);
		
		particle.position.x = Math.max(Math.min(particle.position.x, width), 0);
		particle.position.y = Math.max(Math.min(particle.position.y, height), 0);
		
		particle.size += (particle.targetSize - particle.size ) * 0.05;
		
		if(Math.round(particle.size) == Math.round(particle.targetSize)) particle.targetSize = 1 + Math.random() * 7;
		
		
		ctx.beginPath();
		ctx.fillStyle = particle.fillColor;
		ctx.strokeStyle = particle.fillColor;
		ctx.lineWidth = particle.size;
		ctx.moveTo(location.x, location.y);
		ctx.lineTo(particle.position.x, particle.position.y);
		ctx.stroke();
		ctx.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
		ctx.fill();
	}

}

