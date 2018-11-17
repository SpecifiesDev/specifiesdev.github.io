//Model.js

function LoadModels(ModelLink){

  //Add Loader
  var loader = new THREE.GLTFLoader();

  //Add test shape
  var shape = loader.load(ModelLink);
  window.scene.add(shape);
}
