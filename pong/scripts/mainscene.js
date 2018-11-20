// Main scene manager

// scene
var scene = new THREE.Scene();
// camera, (fov, axis)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderer for animationframes
var renderer = new THREE.WebGLRenderer();

// set the size of the screen, we may edit this later to match with the padding of our main site design
renderer.setSize(700, 420);

// append the renderer
document.body.appendChild(renderer.domElement);

// set up the entire renderer
setup();

function setup() {
	console.log("[--- Setup Started --- ]");
	// Create our playing plane
	try {
	scene.add(createPlane());
	console.log("[--- Main Plane Added Succesfully ---]");
	}
	catch(err) {
		Error("[--- Error creating plane --- ]");
		Error(err);
	}
}
// this callback is :thumb:
var animate = function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();

