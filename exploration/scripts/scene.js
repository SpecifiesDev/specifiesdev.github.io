
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);



// let's get some light
scene.add(new THREE.AmbientLight(0x404040));

var newBasic = basicTerrain();
scene.add(newBasic);

var animate = function animate() {
	requestAnimationFrame(animate);
	render.render(scene, camera);
}
animate();