// Mesh handler for the scene(s)

// field variables
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// game-related variables
var score1 = 0, score2 = 0;
// you can change this to any positive whole number
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

function createPlane() {
	// Set the material of the plane.
	var mat = new THREE.MeshLambertMaterial({color: 0x4BD121});

	//setup variables for the plane
	var planeWidth = fieldWidth;
	var planeHeight = fieldHeight;
	var planeQuality = 10;

	//surface plane
	var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
    planeWidth * 0.95,	
    planeHeight,
    planeQuality,
    planeQuality),
    mat);
	return plane;
}