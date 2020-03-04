var myGamePiece;
var myObstacles = [];
var myNewObstacles = [];
var hitBoxes = [];
var myScore;
var bird = document.getElementById("bird");
var bird2 = document.getElementById("bird2");
var player;
var background = document.getElementById("backgroundImg");
var floor = document.getElementById("floorImg");
var pipe1 = document.getElementById("pipe1");
var pipe2 = document.getElementById("pipe2");
var gameArea;
var crashed = false;
var key = 0;

function startGame() {
    var CollisionBoxes = [];
    CollisionBoxes = [new CollisionBox(7, 1, 10, 5),
    new CollisionBox(5, 4, 16, 5),
    new CollisionBox(2, 6, 19, 8),
    new CollisionBox(1, 8, 5, 5),
    new CollisionBox(4, 15, 19, 2),
    new CollisionBox(5, 17, 16, 2),
    new CollisionBox(8, 19, 6, 2),
    new CollisionBox(23, 13, 1, 1)];

    player = bird;
    //CollisionBoxes = [new CollisionBox(28, 18, 1, 1)];
    myGamePiece = new component(25, 22, 100, 50, "runner", 0, CollisionBoxes);
    myGamePiece.gravity = 0.05;
    myGamePiece.gravitySpeed = 0.50;
    //280
    myScore = new component("15px", "Consolas", 15, 15, "text", 0);
    myGameArea.start();

    document.addEventListener("keydown", test);
    document.addEventListener("keyup", test2);

    //document.addEventListener("mousedown", test);
    //document.addEventListener("mouseup", test2);

    document.addEventListener('touchstart', test);
    document.addEventListener('touchend', test2);
    //this.containerEl.addEventListener(Runner.events.TOUCHSTART, this)
}





function CollisionBox(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

function test(e) {
    console.log("Down " + e.buttons);
    //console.log(e.button)
    //console.log('Down' + e);
    if (e.key === 'ArrowUp' || e.buttons === 1) {
        console.log(key);
        if (key === 0) {
            accelerate(-0.2);
            console.log("DOWN HIT");
            key = 1;
        }
        //console.log(key);
    }

    //if (e.key === 'ArrowDown') {
    //    myGamePiece.status = 'duck';
    //}

}

function mouseClick(e) {
    console.log("CLICK");
    myGamePiece.Jumping = true;
}

function test2(e) {
    console.log('UP ' + e.buttons);

    if (e.key === 'ArrowUp' || e.buttons === 0) {
        console.log(key);
        if (key === 1) {
            accelerate(0.05);
            key = 0;
            console.log("UP HIT");
            console.log(key);
        }

        //console.log(e);
    }

    //if (e.key === 'ArrowDown') {
    //    myGamePiece.status = 'running';
    //}
}


var myGameArea = {
    gameArea: document.getElementById("gameArea"),

    canvas: document.getElementById("canvas"),
    start: function () {

        //this.canvas.width = "100%";
        //this.canvas.height = "100%";
        //this.canvas.style.width = "100%";
        this.context = this.canvas.getContext("2d");
        //this.gameArea.appendChild(this.canvas);
        //var ctx = this.canvas.getContext("2d");
        this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);

        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.addEventListener('click', mouseClick);
        //this.canvas.addEventListener('mouseup', test2);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);

    },
    showFloor: function () {
        //this.context.drawImage(floor, 0, 210, this.canvas.width, 122);
        this.context.drawImage(floor, 0, 117, this.canvas.width, 122);
    },
    gameOver: function () {
        console.log("GAME OVER");
        var nml = document.getElementById("gameOver");
        nml.style.display = "";
    },
    startOver: function () {
        //myGamePiece = '';
        var nml = document.getElementById("gameOver");
        nml.style.display = "none";
        myObstacles = [];
        myNewObstacles = [];
        //hitBoxes = [];
        //myScore;

        //this.clear;
        myObstacles = [];
        //hitBoxes = [];
        myNewObstacles = [];
        myGameArea.frameNo = 0;
        myScore.text = "SCORE: " + myGameArea.frameNo;
        myGamePiece.y = 122;
        crashed = false;
        myGamePiece.gravity = 0.05;
        myGamePiece.gravitySpeed = 0.50;
        //myGameArea.start();
    }
};

function component(width, height, x, y, type, rotation, hitboxes) {

    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.Jumping = false;
    this.maxJump = -0.25;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 1;
    this.rotation = rotation;
    this.status = 'running';
    this.remove = false;
    this.hitboxes = hitboxes;
    this.image = "";
    //var colors = ['black', 'red', 'green', 'blue', 'orange', 'pink', 'navy', 'mistyrose', 'blueviolet'];
    //this.color = colors[color];

    this.update = function () {
        ctx = myGameArea.context;

        switch (this.type) {
            case 'text':
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = "black";
                ctx.fillText(this.text, this.x, this.y);
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case 'runner':
                ctx.drawImage(player, this.x, this.y, this.width, this.height);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "blue";

                //this.hitboxes = hitboxes;
                break;
            case 'pipe':
                ctx.save();

                if (this.rotation === 1) {
                    this.image = pipe2;

                }
                else {
                    this.image = pipe1;
                }

                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                ctx.strokeStyle = 'red';
                break;
            case 'floor':
                ctx.drawImage(floor, this.x, this.y, myGameArea.canvas.width, 5);
                ctx.strokeStyle = 'red';
                break;
        }
        //if (this.type !== 'text') {
        //    var i;//Draws the hitboxes around the object
        //    for (i = 0; i < this.hitboxes.length; i++) {
        //        ctx.strokeRect(this.x + this.hitboxes[i].x, this.y + this.hitboxes[i].y, this.hitboxes[i].width, this.hitboxes[i].height);
        //        ctx.stroke();
        //    }
        //}
    };
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    };
    this.isJumping = function () {
        if (this.Jumping) {
            if (this.gravity !== this.maxJump) {
                this.gravity = Math.round((this.gravity - 0.05) * 100) / 100;
                player = bird2;

            }
            else {
                player = bird;
                this.gravity = 0.05;
                this.Jumping = false;
            }

            console.log("Gravity:      " + this.gravity);
            console.log("GravitySpeed: " + this.gravitySpeed);
        }
    };
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    };
    this.crashWith = function (otherobj) {
        var crash = false;

        var i;
        for (i = 0; i < this.hitboxes.length; i++) {
            var rectA = {
                left: this.x + this.hitboxes[i].x,
                top: this.y + this.hitboxes[i].y,
                right: this.x + this.hitboxes[i].x + this.hitboxes[i].width,
                bottom: this.y + this.hitboxes[i].y + this.hitboxes[i].height
            };

            if (crash) { break; }

            var x;
            for (x = 0; x < otherobj.hitboxes.length; x++) {
                var rectB = {
                    left: otherobj.x + otherobj.hitboxes[x].x,
                    top: otherobj.y + otherobj.hitboxes[x].y,
                    right: otherobj.x + otherobj.hitboxes[x].x + otherobj.hitboxes[x].width,
                    bottom: otherobj.y + otherobj.hitboxes[x].y + otherobj.hitboxes[x].height
                };

                if (intersectRect(rectA, rectB)) {
                    crash = true;
                    break;
                }

                //if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                //    crash = false;
                //}
            }
        }

        return crash;
    };
}

function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}

function updateGameArea() {
    var x, pos, height, gap, minHeight, maxHeight, minGap, maxGap, color, defH1, defH2;
    if (crashed === false) {
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.gameOver();
                document.getElementById("gameOver").classList.remove("hidden");
                crashed = true;
                return;
            }
        }

        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo === 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;

            minHeight = 100;
            maxHeight = 200;

            height = myGameArea.canvas.height;

            minGap = 35;
            maxGap = 40;

            gap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;

            var a;

            a = height - 105;//42

            pos = Math.floor(Math.random() * a) + 42;

            defH2 = pos;//-Math.abs(pos);

            pos = 325 - defH2;
            pos += gap;
            pos = -Math.abs(pos);
            defH1 = pos;

            var collisionBox1 = [];
            var collisionBox2 = [];
            var collisionBox3 = [];
            collisionBox1 = [new CollisionBox(0, 0, 32, 325)];
            collisionBox2 = [new CollisionBox(0, 0, 32, 325)];

            collisionBox3 = [new CollisionBox(0, 0, myGameArea.canvas.width, 122)];
            //this.context.drawImage(floor, 0, 210, this.canvas.width, 122);
            myObstacles.push(new component(32, 325, x, defH1, "pipe", 1, collisionBox1));
            myObstacles.push(new component(32, 325, x, defH2, "pipe", 2, collisionBox2));
            if (myGameArea.frameNo === 1) {
                myObstacles.push(new component(myGameArea.canvas.width, 117, 0, 210, "floor", 0, collisionBox3));
            }

        }

        var count = 0;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myObstacles[i].type !== 'floor') {
                myObstacles[i].x += -1;
                myObstacles[i].update();
                if (myObstacles[i].x + myObstacles[i].width < 0) {
                    myNewObstacles[count] = i;
                    count++;

                }
            }
        }

        myScore.text = "SCORE: " + myGameArea.frameNo;
        myScore.update();

        myGamePiece.newPos();
        myGameArea.showFloor();
        myGamePiece.update();
        myGamePiece.isJumping();
    }

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) {

        return true;
    }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}