
	var x = [];
	var y = [];
	var ap = aireference;

	var closestXObject = NaN;
	var vy = NaN;



	function generation() {
		createMap();
		
		xdiff = [];

		px = player.x;
		py = player.y;

		ydiff = [];
		x.forEach(function(e) {
			if(px > e) {
				xdiff.push(Math.floor(px - e));
			} else if(e > player.x) {
				xdiff.push(Math.floor(e - px));
			}
		});
		y.forEach(function(e) {
			if(py > e) {
				ydiff.push(Math.floor(player.y - e));
			} else if(e > py) {
				ydiff.push(Math.floor(e - player.y));
			}
		});



		ydiff.sort(numberAs);
		xdiff.sort(numberAs);

		closestx = xdiff[0];
		closesty = ydiff[0];
		console.log(closestx);

		tryx(closestx, px);
		if(calcifY(closestx, player, ydiff)) {
			dx = vy.dx;
			dy = vy.dy;
			calculateMovement(dx, dy);
		} else {
			dx = closestXObject.dx;
			dy = closestXObject.dy;
			console.log(dx);
			calculateMovement(dx, dy);
		}
		// flush datamap
		x = [];
		y = [];
	}

	function createMap() {
		easyPlayers.forEach(function(e) {
			x.push(e.x);
			y.push(e.y);
		});
		mediumPlayers.forEach(function(e) {
			x.push(e.x);
			y.push(e.y);
		});
		hardPlayers.forEach(function(e) {
			x.push(e.x);
			y.push(e.y);
		});
		insanePlayers.forEach(function(e) {
			x.push(e.x);
			y.push(e.y);
		});
	}
	function numberAs(a,b) {
  		return a-b;
	}
	function tryx(xdiff, player) {
		positive = Math.floor(player + xdiff);
		negative = Math.floor(player - xdiff);
		ap.forEach(function(e) {
			epos = e.x;
			if(positive == epos || negative == epos) {
				closestXObject = e;
			}

		});
	}
	function calcifY(closestx, player, ydiff) {

		positive = Math.floor(player.y + ydiff);
		negative = Math.floor(player - ydiff);
		ap.forEach(function(e) {
			epos = e.y;
			if(positive == epos || negative == epos) {
				vy = e;
			}
		});
		vyx = vy.x;
		var vydiff = 0;

		if(player.x > vyx) {
			vydiff = Math.floor(player.x - vyx);
		} else if(vyx > player.x) {
			vydiff = Math.floor(vyx - player.x);
		}
		console.log("Diff: " + vydiff);
		if(vydiff < closestx) {
			return true;
		} else if(closestx > vydiff) {
			return false;
		}
	}
	function calculateMovement(ddx, ddy) {
		returnKey(ddx, ddy);
	}
	function returnKey(dx, dy) {
		cursor.leftPressed = false;
		cursor.rightPressed = false;
		cursor.upPressed = false;
		cursor.downPressed = false;
		console.log(dx + " " + dy);
		/*
		dx:
		< 0 = moving left
		> 0 = moving right
		*/
		/*
		dy:
		< 0 = moving down
		> 0 = moving up
		*/

		// left & down, left & up, right & down, right & up
		if(dx < 0 && dy < 0) {
			cursor.upPressed = true;
			cursor.rightPressed = true;
			console.log("Right and up")
		}
		else if(dx < 0 && dy > 0) {
			cursor.rightPressed = true;
			cursor.downPressed = true;
			console.log("Right and down");
		}
		else if(dx > 0 && dy < 0) {
			cursor.upPressed = true;
			cursor.leftPressed = true;
			console.log("Left and up");
		}
		else if(dx > 0 && dy > 0) {
			cursor.leftPressed = true;
			cursor.downPressed = true;
			console.log("Left and down");
		}
	}

// we want the ai to loop with the main program to catch death signals
	var choice = setInterval(function() {
		generation();
	}, 1000 / 30);


