//Mesh handler
//
// return a hero object 
function getHero() {
	var heroGeometry = new THREE.BoxGeometry(1,1, 1);
	var heroMaterial = new THREE.MeshStandardMaterial({color:0x883333});
	hero = new THREE.Mesh(heroGeometry,heroMaterial);
	hero.castShadow = true;
	hero.receiveShadow = false;
	hero.position.y = 2;

	return hero;
}
// return the playing plane
function getPlane() {
	var planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
	var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.castShadow= false;
	plane.rotation.x =- Math.PI / 2;

	return plane;
}
//return sun object
function getSun() {
	sun = new THREE.DirectionalLight( 0xffffff, 0.8);
	sun.position.set( 0,4,1 );
	sun.castShadow = true;

	return sun;
}
function getOC(c, r) {
	orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
	orbitControl.addEventListener( 'change', render );
	//orbitControl.enableDamping = true;
	//orbitControl.dampingFactor = 0.8;
	orbitControl.enableZoom = false;

	
}