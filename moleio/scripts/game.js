    // main loop
    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = 1225;
    ctx.canvas.height = 875;

    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;

    var tX = -(window.innerWidth - 11);
    var tY = 830;

    var testGrass = grass({
        x: 0,
        y: 818
    });

    var level1 = true;
    var l1s = false;

    var loadedLevel = [];

    var speed = 9;

    var yspeed = 12;



    var seconds = 0;
    var start = Date.now();

    var cooldown = false;

    var upKey = [];

    var upandRight = [];

    var upandLeft = [];

    var bullets = [];

    var gunObjects = [];

    var regularObjects = [];

    var collidingX = 0;
    var collidingY = 0;

    var coinv = 0;

    var constantX = 0;

    var collidedCoins = [];

    var winObjects = [];

    function update() {

        winObjects.forEach(function(e) {
            if(collides(player, e)) {
                clearInterval(startGame);
                win();
            }
        });

        seconds = Math.floor((Date.now() - start) / 1000);
        if (seconds % 15 == 0) {
            gunObjects.forEach(function(e) {
                bullets.push(bullet({
                    x: e.x - 10,
                    y: e.y + 15,
                    dx: 3
                }));
            });
        }

        bullets.forEach(function(e) {

            e.x -= e.dx;

            if (bulletCollides(player, e)) {
                die();
            }

        });


        move();
        if (inAir(player)) {
            if (!playerVerticalCollision()) {
                player.y += player.dy;
                player.x += player.dx;
            } else if (playerVerticalCollision()) {
                player.dy = 0;
                player.dx = 0;
                upKey = [];
                upandRight = [];
                upandLeft = [];
            }
        } else {
            player.dy = 0;
            player.dx = 0;
            upKey = [];
            upandRight = [];
            upandLeft = [];
        }

    }

    function draw() {
        ctx.clearRect(0, 0, 200 * 35, canvas.height);

        if (level1 && !l1s) {
            loadLevel(l1);
            l1s = true;
            console.log("Level one loaded!");
        }

        loadedLevel.forEach(function(e) {
            if (e.type == "grass" || e.type == "rock" || e.type == "gun" || e.type == "bottom" || e.type == "coin" || e.type == "lava") {
                regularObjects.push(e);
            }
            if(e.type == "win") {
                winObjects.push(e);
            }
            e.draw();
        });
        player.draw();
        bullets.forEach(function(e) {
            if (e.x < 0) {
                bullets.pop(e);
            } else {
                e.draw();
            }
        });


    }

    var cursor = {
        'rightPressed': false,
        'leftPressed': false,
        'downPressed': false,
        'upPressed': false,
        'r': false
    }
    var player = {
        color: "#5f708c",
        x: 11,
        y: 830,
        dy: 0,
        dx: 0,
        imageEnabled: false,
        image: "/",
        draw: function() {
            if (this.imageEnabled) {

            } else if (!this.imageEnabled) {
                // If we don't have a sprite, place a circle for testing purpose
                ctx.beginPath();
                ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    var coins = {
        color: "#5f708c",
        x: 1100,
        y: 30,
        drawg: function() {
            createText(coinv, this.x, this.y, "15px x", this.color);
        }
    }

    function playerVerticalCollision() {
        var breakv = false;

        if (player.y <= 830) {
            regularObjects.forEach(function(e) {
                if (e.type == "grass" || e.type == "gun" || e.type == "rock") {
                    if (!breakv) {
                        if (collides(player, e)) {
                            collidingY = e.y;
                            collidingX = e.x;
                            breakv = true;

                        }
                    }
                }
                if (e.type == "coin") {
                    if (collides(player, e)) {
                        loadedLevel.pop(e);
                        loadedLevel.push(sky({
                            x: e.x,
                            y: e.y,
                            type: "sky"
                        }));
                        if (!collidedCoins.includes(e.x)) {
                            coinv += 1;
                            collidedCoins.push(e.x);
                        }
                    }
                }
                if (e.type == "lava") {
                    if (collides(player, e)) {
                        die();
                    }
                }
            });
        }
        return breakv;

    }

    function playerHorizontalCollision() {
        var breakv = false;
        if (!inAir(player)) {

            if (player.y <= 830) {
                regularObjects.forEach(function(e) {
                    if (e.type == "grass" || e.type == "gun" || e.type == "rock" || e.type == "bottom") {
                        if (!breakv) {
                            if (collides(player, e)) {
                                collidingY = e.y;
                                collidingX = e.x;
                                breakv = true;
                            }
                        }

                    }
                    if (e.type == "coin") {
                        if (collides(player, e)) {
                            loadedLevel.pop(e);
                            loadedLevel.push(sky({
                                x: e.x,
                                y: e.y,
                                type: "sky"
                            }));
                            if (!collidedCoins.includes(e.x)) {
                                coinv += 1;
                                collidedCoins.push(e.x);
                            }
                        }
                    }
                    if (e.type == "lava") {
                        if (collides(player, e)) {
                            die();
                        }
                    }
                });
            }
        }
        return breakv;

    }
    // 13 represents the size of our player object. 
    function collides(a, b) {
        return a.x < b.x + 35 &&
            a.x + 10 > b.x &&
            a.y < b.y + 35 &&
            a.y + 10 > b.y
    }

    function bulletCollides(a, b) {
        return a.x < b.x + 5 && a.x + 10 > b.x && a.y < b.y + 5 && a.y + 10 > b.y;
    }

    // 2dc doesn't have a camera object, so we create a function to translate the canvas and undraw objects < 500px
    function moveCamera(x, y) {
        tY += y;
        tX += x;
        ctx.translate(x, y)
        var toCreate = coins.x + x;
        coin.x = toCreate;
        constantX += -x;
    }

    function die() {
        player.x = 11;
        player.y = 830;
        moveCamera(constantX, 0);

    }

    function win() {
        console.log("You win!!!");
        console.log("You collected a total of: " + coinv + " coins.");
        console.log("I got lazy with this function, so just reload to play again.. Doubt you will.");
        ctx.clearRect(0, 0, 200 * 35, canvas.height);
        console.log("hi");
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
        } else if (e.keyCode == 82) {
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
        } else if (e.keyCode == 82) {
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
        rockImage.src = "./resources/rock.png";
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.drawImage(rockImage, i.x, i.y, w, h);
        }
        return i;
    }

    function gun(i) {
        var gunImage = new Image(5, 5);
        gunImage.src = "./resources/gun.jpg";
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.drawImage(gunImage, i.x, i.y, w, h);
        }
        return i;
    }

    function bullet(i) {
        i.draw = function() {
            ctx.beginPath();
            ctx.arc(i.x, i.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "#204a8e";
            ctx.fill();
            ctx.closePath();
        }
        return i;
    }

    function bottom(i) {
        var bottomImage = new Image(5, 5);
        bottomImage.src = "./resources/bottom.jpg";
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.drawImage(bottomImage, i.x, i.y, w, h);
        }
        return i;
    }

    function cloud(i) {
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = "#e8eaed";
            ctx.fillRect(i.x, i.y, w, h);
            ctx.closePath();
        }
        return i;
    }

    function winb(i) {
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = "#32db7b";
            ctx.fillRect(i.x, i.y, w, h);
            ctx.closePath();
        }
        return i;
    }

    function coin(i) {
        var coinImage = new Image(5, 5);
        coinImage.src = "./resources/coin.png";
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.drawImage(coinImage, i.x, i.y, w, h);
        }
        return i;
    }

    function lava(i) {
        var lavaImage = new Image(5, 5);
        lavaImage.src = "./resources/lava.jpg";
        var w = 35;
        var h = 35;
        i.draw = function() {
            ctx.drawImage(lavaImage, i.x, i.y, w, h);
        }
        return i;
    }

    function loadLevel(toLoad) {
        loadedLevel = [];
        for (var c = 0; c < toLoad.cols; c++) {
            for (var r = 0; r < toLoad.rows; r++) {
                var tile = toLoad.getTile(c, r);
                if (tile == 1) {
                    loadedLevel.push(grass({
                        x: c * 35,
                        y: r * 35,
                        type: "grass",
                    }));
                }
                if (tile == 0) {
                    loadedLevel.push(sky({
                        x: c * 35,
                        y: r * 35,
                        type: "sky"
                    }));
                }
                if (tile == 2) {
                    loadedLevel.push(rock({
                        x: c * 35,
                        y: r * 35,
                        type: "rock"
                    }));
                }
                if (tile == 3) {
                    loadedLevel.push(gun({
                        x: c * 35,
                        y: r * 35,
                        type: "gun"
                    }));
                    gunObjects.push(gun({
                        x: c * 35,
                        y: r * 35
                    }));
                }
                if (tile == 4) {
                    loadedLevel.push(bottom({
                        x: c * 35,
                        y: r * 35,
                        type: "bottom"
                    }));
                }
                if (tile == 5) {
                    loadedLevel.push(cloud({
                        x: c * 35,
                        y: r * 35,
                        type: "cloud"
                    }));
                }
                if (tile == 6) {
                    loadedLevel.push(coin({
                        x: c * 35,
                        y: r * 35,
                        type: "coin"
                    }));
                }
                if (tile == 7) {
                    loadedLevel.push(lava({
                        x: c * 35,
                        y: r * 35,
                        type: "lava"
                    }));
                }
                if(tile == 8) {
                    loadedLevel.push(winb({x: c * 35, y: r * 35, type: "win"}));
                }
            }
        }
    }

    function returnRandom(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function drawCoin() {
        coins.drawg();
    }

    function inAir(toCheck) {
        if (toCheck.y == 830 || toCheck.y > 831) {
            return false;
        } else {
            return true;
        }
    }

    function move() {
        // smoother movement mechanics
        if (cursor.rightPressed && cursor.upPressed && player.x < 200 * 35 - 10 && player.y > 10) {
            upandRight.push("uar");
            if (upandRight.length < 10) {

                if (!playerHorizontalCollision()) {
                    player.x += speed;
                    player.y -= yspeed;
                    player.dy = 4;
                    player.dx = 3;

                    var tXI = tX;

                    var l1Limit = 200 * 35;

                    if (level1) {

                        var swi = l1Limit - player.x < 1172;

                        if (!swi) {
                            moveCamera(-10, 0);
                        }
                    }
                }
            }
        } else if (cursor.leftPressed && cursor.upPressed && player.x > 10 && player.y > 10) {
            upandLeft.push("ual");
            if (upandLeft.length < 10) {
                player.x -= speed;
                player.y -= yspeed;
                player.dy = 4;
                player.dx = -3;

                var limit = 600;
                var l1Limit = 200 * 35;
                var swi = player.x > 35;
                if (level1) {
                    if (swi) {
                        moveCamera(10, 0);
                    }
                }

            }
        } else if (cursor.rightPressed && player.x < 200 * 35 - 10) {

            if (!playerHorizontalCollision()) {
                player.x += speed + 3;
                var tXI = tX;

                var l1Limit = 200 * 35;

                if (level1) {
                    var swi = l1Limit - player.x < 1000;
                    if (!swi) {
                        moveCamera(-10, 0);
                    }

                }
            }
        } else if (cursor.leftPressed && player.x > 10) {
            player.x -= speed + 3;
            var limit = 600;
            var l1Limit = 200 * 35;
            var swi = player.x > 800;
            if (level1) {
                if (swi) {
                    moveCamera(10, 0);
                }
            }
        } else if (cursor.upPressed && player.y > 10) {
            upKey.push("up");
            if (upKey.length < 10) {
                player.y -= yspeed;
                player.dy = 4;
            }
        }
    }

    function createText(text, x, y, font, color) {
        ctx.beginPath();
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.fill();
        ctx.closePath();
    }



    var startGame = setInterval(function() {
        update();
        draw();
    }, 1000 / 30);