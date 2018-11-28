// Main scene manager

// assisted wtih https://gamedevelopment.tutsplus.com/tutorials/creating-a-simple-3d-endless-runner-game-using-three-js--cms-29157

// scene
var scene = new THREE.Scene();
// camera, (fov, axis)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderer for animationframes
var renderer = new THREE.WebGLRenderer({alpha:true});

// set the size of the screen, we may edit this later to match with the padding of our main site design
renderer.setSize(window.innerWidth - 30, window.innerHeight - 30);

// add shadow cap
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// append the renderer
document.body.appendChild(renderer.domElement);

// set up the entire renderer
setup();

function setup() {
	try {
		scene.add(getHero());
		Log("Hero added to the scene!");
	}
	catch(err) {
		Error(err);
	}
	try {
		scene.add(getPlane());
		Log("Plane added to the scene!");
	}
	catch(err) {
		Error(err);
	}
	camera.position.z = 5;
	camera.position.y = 1;

	// start setting up lighting
	var sun = getSun();

	// shadow props
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50 ;

	getOC(camera, renderer);
}

// this callback is :thumb:
var animate = function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();

