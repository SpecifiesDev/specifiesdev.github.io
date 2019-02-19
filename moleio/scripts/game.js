	// main loop


	var canvas = document.getElementById("canv");
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = 1225;
	ctx.canvas.height = 875;

	document.onkeydown = keyDownHandler;
	document.onkeyup = keyUpHandler;

	var tX = 0;
	var tY = 1;
	
	var testGrass = grass({x: 0, y: 818});

	var level1 = true;
	var l1s = false;

	var loadedLevel = [];

	var speed = 8;



    var seconds = 0;
    var start = Date.now();

    var cooldown = false;

    var upKey = [];

   	var upandRight = [];

   	var upandLeft = [];

	function update() {
		
		move();
		if(inAir(player)) {
		 player.y += player.dy;
		 player.x += player.dx;
		} else {
			player.dy = 0;
			player.dx = 0;
			upKey = [];
			upandRight = [];
			upandLeft = [];
		}
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(level1 && !l1s) {
			loadLevel(l1);
			l1s = true;
			console.log("Level one loaded!");
		}
		
		loadedLevel.forEach(function(e) {

			e.draw();
		});
		player.draw();

	}

	var cursor = {
		'rightPressed' : false,
		'leftPressed' : false,
		'downPressed' : false,
		'upPressed' : false,
		'r' : false
	}
	var player = {
		color: "#5f708c",
		x: 11,
		y: 830,
		dy: 0,
		dx: 0,
		imageEnabled: false,
		image: "/",
		draw : function() {
			if(this.imageEnabled) {

			} else if(!this.imageEnabled) {
				// If we don't have a sprite, place a circle for testing purpose
				ctx.beginPath();
	            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
	            ctx.fillStyle = this.color;
	            ctx.fill();
	            ctx.closePath();
			}
		}
	}

	// 13 represents the size of our player object. 
    function collider(a, b) { return a.x < b.x + 13 && a.x + 13 > b.x && a.y < b.y + 13 && a.y + 13 > b.y; }

	// 2dc doesn't have a camera object, so we create a function to translate the canvas and undraw objects < 500px
	function moveCamera(x, y) {
		ctx.translate(x, y)
		tY += y;
		tX += x;
	}
 
    function keyDownHandler(e) {
        e.preventDefault();
        if (e.keyCode == 39) {
            cursor.rightPressed = true;
        } else if (e.keyCode == 37) {
            cursor.leftPressed = true;
        } else if (e.keyCode == 38) {
            cursor.upPressed = true;
        } else if (e.keyCode == 40) {
            cursor.downPressed = true;
        } else if(e.keyCode ==  82) {
            cursor.r = true;
        }

    }


    function keyUpHandler(e) {
        e.preventDefault();
        if (e.keyCode == 39) {
            cursor.rightPressed = false;
        } else if (e.keyCode == 37) {
            cursor.leftPressed = false;
        } else if (e.keyCode == 38) {
            cursor.upPressed = false;
        } else if (e.keyCode == 40) {
            cursor.downPressed = false;
        } else if(e.keyCode == 82) {
            cursor.r = true;
        }
    }

    function grass(i) {
    	var grassImage = new Image(5, 5);
	 	var imgPath = "./resources/th.jpg"
	 	grassImage.src = imgPath;
	 	var w = 35;
	 	var h = 35; 
	 	i.draw = function() {
	 		ctx.drawImage(grassImage, i.x, i.y, w, h);
	 	}
	return i;
 	}
 	function sky(i) {
 		var w = 35;
 		var h = 35;
 		i.draw = function() {
 			ctx.beginPath();
 			ctx.fillStyle = "#769fe0";
 			ctx.fillRect(i.x, i.y, w, h);
 			ctx.closePath();
 		}
 		return i;
 	}
 	function rock(i) {
 		var rockImage = new Image(5, 5);
 		rockImage.src = "./resources/rock.png"
 		var w = 35;
 		var h = 35;
 		i.draw = function() {
 			ctx.drawImage(rockImage, i.x, i.y, w, h);
 		}
 		return i;
 	}
 	function loadLevel(toLoad) {
 		loadedLevel = [];
 		for(var c = 0; c < toLoad.cols; c++) {
 			for(var r = 0; r < toLoad.rows; r++) {
 				var tile = toLoad.getTile(c, r);
 				if(tile == 1) {
 					loadedLevel.push(grass({x: c * 35, y: r * 35}));
 				}
 				if(tile == 0) {
 					loadedLevel.push(sky({x: c * 35, y: r * 35}));
 				}
 				if(tile == 2) {
 					loadedLevel.push(rock({x: c * 35, y: r * 35}));
 				}
 			}
 		}
 	}

    function returnRandom(min, max) {
    	return Math.floor(Math.random() * max) + min;
    }
    function inAir(toCheck) {
    	if(toCheck.y == 830 || toCheck.y == 831 || toCheck.y > 831) {
    		return false;
    	} else {
    		return true;
    	}
    }
    function move() {
    	// smoother movement mechanics
    	if (cursor.rightPressed && cursor.upPressed && player.x < canvas.width - 10 && player.y > 10){
    		upandRight.push("uar");
    		if(upandRight.length < 10) {
    			player.x += speed;
    			player.y -= speed;
    			player.dy = 4;
    			player.dx = 2;
    			var tYI = -tY;
    			console.log(tYI);
    			var l1Limit = 36 * 35;
    			console.log(l1Limit);
    			if(level1) {
    				var isTrue = tYI == l1Limit;
    				if(!isTrue) {
    					moveCamera(-3, 0);
    				}
    			}

    		}
    	}
    	else if (cursor.leftPressed && cursor.upPressed && player.x > 10 && player.y > 10){
    		upandLeft.push("ual");
    		if(upandLeft.length < 10) {
    			player.x -= speed;
    			player.y -= speed;
    			player.dy = 4;
    			player.dx = -2;
    		}
    	}
        else if (cursor.rightPressed && player.x < canvas.width - 10) {
            player.x += speed;
        } 
        else if (cursor.leftPressed && player.x > 10) {
            player.x -= speed;
        } 
        else if (cursor.upPressed && player.y > 10) {
        	upKey.push("up");
        	if(upKey.length < 10) {
        		player.y -= speed;
             	player.dy = 4;
        	}
        } 
    }



    var startGame = setInterval(function() {
    	update();
    	draw();
    }, 1000 / 30);




