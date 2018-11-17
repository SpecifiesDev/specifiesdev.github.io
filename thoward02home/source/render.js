//Render.js

function SetUpRenderer(){
  //Set up WebGLRenderer
  window.renderer = new THREE.WebGLRenderer(); //Window so it can be accessed through out the script

  //Set size and append it
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

}

function AnimationLoop(){
  //Load next frame
  window.requestAnimationFrame(AnimationLoop);
  //Check For Changes

  //Render
  window.renderer.render(scene, camera);
}
