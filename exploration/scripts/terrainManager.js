function basicTerrain() {
	var xS = 63, yS = 63;


	// Here we package the terrain with different vars, which will change per return function
	terrainScene = THREE.Terrain({
	    easing: THREE.Terrain.Linear,
	    frequency: 2.5,
	    heightmap: THREE.Terrain.DiamondSquare,
	    material: new THREE.MeshBasicMaterial({color: 0x5566aa}),
	    maxHeight: 100,
	    minHeight: -100,
	    steps: 1,
	    useBufferGeometry: false,
	    xSegments: xS,
	    xSize: 1024,
	    ySegments: yS,
	    ySize: 1024,
	});

	// add meshes
	var geo = terrainScene.children[0].geometry;
	// distribute trees
	meshes = THREE.Terrain.ScatterMeshes(geo, {
	    mesh: new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 12, 6)),
	    w: xS,
	    h: yS,
	    spread: 0.02,
	    randomness: Math.random,
	});
	terrainScene.add(meshes);
	var t1 = THREE.ImageUtils.loadTexture("./scripts/blends/shale.jpg");
	var t2 = THREE.ImageUtils.loadTexture("./scripts/blends/dirt.jpg");
	var t3 = THREE.ImageUtils.loadTexture("./scripts/blends/lg.jpg");
	var t4 = THREE.ImageUtils.loadTexture("./scripts/blends/dg.jpg");
	var material = THREE.Terrain.generateBlendedMaterial([
	    // The first texture is the base; other textures are blended in on top.
	    {texture: t1},
	    // Start blending in at height -80; opaque between -35 and 20; blend out by 50
	    {texture: t2, levels: [-80, -35, 20, 50]},
	    {texture: t3, levels: [20, 50, 60, 85]},
	    // How quickly this texture is blended in depends on its x-position.
	    {texture: t4, glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 10.0, 80.0, vPosition.z)'},
	    // Use this texture if the slope is between 27 and 45 degrees
	    {texture: t3, glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2'},
	]);

	return terrainScene;
}