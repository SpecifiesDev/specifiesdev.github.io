//source/main.js


function On_Ready(){
  //Start Up
  console.log("[ -- Start -- ]")

  //Set up Scene
  console.log("[ -- Setting up Renderer -- ]");
  SetUpRenderer();
  console.log("[ -- Setting up Scene -- ]");
  SetUpScene();

  //Animate
  console.log("[ -- Setting up Animation Loop -- ]");
  AnimationLoop();

  console.log("[ -- Finished set up -- ]");

}

document.addEventListener("DOMContentLoaded", function(){
  console.log('[ -- Ready | Starting... -- ]')
  On_Ready();
});
