// Handlers




document.onkeydown = keyDownHandler;

function keyDownHandler(e) {
	if(e.keyCode == 13 && !running) {
		algorithm();
	}
}

