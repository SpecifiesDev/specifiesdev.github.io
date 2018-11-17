//Intro scene


function SetUpScene(){

  //Set Scene and camera
  window.scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Set Pos Of Camera
  camera.position.z = 5;

  StartModelLoad();
}

function StartModelLoad(){

  //Call to models.js to load a model from a like
  LoadModels("server");

}
