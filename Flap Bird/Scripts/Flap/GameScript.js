var myGamePiece;
var myObstacles = [];
var myNewObstacles = [];
var hitBoxes = [];
var myScore;
var bird = document.getElementById("bird");
var pipe1 = document.getElementById("pipe1");
var pipe2 = document.getElementById("pipe2");
var gameArea;

function startGame() {
    var CollisionBoxes = [];
    CollisionBoxes = [new CollisionBox(12, 1, 10, 25),
        new CollisionBox(0, 9, 26, 8),
        new CollisionBox(6, 5, 19, 5),
        new CollisionBox(4, 19, 23, 5),
        new CollisionBox(7, 3, 5, 5),
        new CollisionBox(6, 21, 20, 5),
        new CollisionBox(10, 24, 7, 5),
        new CollisionBox(28, 18, 1, 1)];
    //CollisionBoxes = [new CollisionBox(28, 18, 1, 1)];
    myGamePiece = new component(30, 30, 100, 245, "runner", 0, CollisionBoxes);
    myGamePiece.gravity = 0.05;

    myScore = new component("30px", "Consolas", 280, 40, "text", 0);
    myGameArea.start();

    document.addEventListener("keydown", test);
    document.addEventListener("keyup", test2);
}

function test(e) {

    //console.log('Down' + e);
    if (e.key === 'ArrowUp') {
        accelerate(-0.2);
    }

    if (e.key === 'ArrowDown') {
        myGamePiece.status = 'duck';
    }

}


function CollisionBox(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

function test2(e) {
    //console.log('Release' + e);

    if (e.key === 'ArrowUp') {
        accelerate(0.05);
        //console.log(e);
    }

    if (e.key === 'ArrowDown') {
        myGamePiece.status = 'running';
    }
}


var myGameArea = {
    gameArea: document.getElementById("gameArea"),

    canvas: document.createElement("canvas"),
    start: function () {

        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.width = "100%";
        this.context = this.canvas.getContext("2d");
        this.gameArea.appendChild(this.canvas);
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "light blue";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, x, y, type, rotation,hitboxes) {

    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.rotation = rotation;
    this.status = 'running';
    this.remove = false;
    this.hitboxes = hitboxes;
    this.image = "";
    var colors = ['black', 'red', 'green', 'blue', 'orange', 'pink', 'navy', 'mistyrose', 'blueviolet'];
    //this.color = colors[color];

    this.update = function () {
        ctx = myGameArea.context;


        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = "black";
            ctx.fillText(this.text, this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        else {
            if (this.type === 'runner') {
                //this.width = 15;
                
                //var CollisionBoxes = [];
                //CollisionBoxes = [new CollisionBox(12, 1, 10, 25),
                //    new CollisionBox(0, 9, 26, 8)];
                //this.hitboxes = CollisionBoxes;

                if (this.status === 'running') {
                    this.height = 30;
                }
                else {
                    this.height = 15;
                }
                ctx.drawImage(bird, this.x, this.y, this.width, this.height);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "blue";
                //ctx.moveTo(this.x, this.y);
                //ctx.lineTo(0, 0);
                //ctx.stroke;
                //ctx.strokeStyle = "blue";
                //ctx.strokeRect(this.x + this.hitboxes[0].x, this.y + this.hitboxes[0].y, this.hitboxes[0].width, this.hitboxes[0].height);
                //var c = document.getElementById("myCanvas");
                //var ctx = c.getContext("2d");
                //ctx.moveTo(0, 0);
                //ctx.lineTo(200, 100);
                //ctx.stroke();
                //this.hitboxes = [new CollisionBox(11, 1, 10, 25),new CollisionBox(0,9,26,8)];
            }
            else {
                ctx.save();
                
                if (this.rotation === 1) {
                    this.image = pipe2;
                    //ctx.drawImage(pipe2, this.x, this.y, this.width, this.height);
                }
                else {
                    this.image = pipe1;
                }

                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                ctx.strokeStyle = 'red';
            }

            

            //var i;//Draws the hitboxes around the object
            //for (i = 0; i < this.hitboxes.length; i++) {
            //    ctx.strokeRect(this.x + this.hitboxes[i].x, this.y + this.hitboxes[i].y, this.hitboxes[i].width, this.hitboxes[i].height);
            //    ctx.stroke();
            //}
        }
    };
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
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
            //var myleft = this.x + this.hitboxes[i].x;
            //var myright = this.x + this.hitboxes[i].x + this.hitboxes[i].width;
            //var mytop = this.y + this.hitboxes[i].y;
            //var mybottom = this.y + this.hitboxes[i].y + this.hitboxes[i].height;
            //var topLeft = this.x + this.hitboxes[i].x;
            //var bottomRight = this.x + hitboxes[i].x + this.y + hitboxes[i].height + hitboxes[i].width;
            if (crash) { break; }

            var x;
            for (x = 0; x < otherobj.hitboxes.length; x++) {
                var rectB = {
                    left: otherobj.x + otherobj.hitboxes[x].x,
                    top: otherobj.y + otherobj.hitboxes[x].y,
                    right: otherobj.x + otherobj.hitboxes[x].x + otherobj.hitboxes[x].width,
                    bottom: otherobj.y + otherobj.hitboxes[x].y + otherobj.hitboxes[x].height
                };
                //var otherleft = otherobj.x + otherobj.hitboxes[x].x;
                //var otherright = otherobj.x + otherobj.hitboxes[x].x + otherobj.hitboxes[x].width;
                //var othertop = otherobj.y + otherobj.hitboxes[x].y;
                //var otherbottom = otherobj.y + otherobj.hitboxes[x].y + otherobj.hitboxes[x].height;
                //var otherTopLeft = otherobj.x + otherobj.hitboxes[x].x;
                //var otherBottomRight = otherobj.x + otherobj.hitboxes[x].x + otherobj.y + otherobj.hitboxes[x].height + otherobj.hitboxes[x].width;

                if (intersectRect(rectA, rectB)) {
                    crash = true;
                    break;
                }

                //if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                //    crash = false;
                //}
            }
        }
        //var myleft = this.x;
        //var myright = this.x + this.width;
        //var mytop = this.y;
        //var mybottom = this.y + this.height;

        //var otherleft = otherobj.x;
        //var otherright = otherobj.x + (otherobj.width);
        //var othertop = otherobj.y;
        //var otherbottom = otherobj.y + (otherobj.height);

        //var crash = true;
        //if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        //    crash = false;
        //}

        //if (crash) {
        //    console.log("Test");
        //}

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
    var x,pos, height, gap, minHeight, maxHeight, minGap, maxGap, color,defH1,defH2;

     for (i = 0; i < myObstacles.length; i += 1) {
         if (myGamePiece.crashWith(myObstacles[i])) {
             return;
         }
     }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo === 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;

        minHeight = 42;
        maxHeight = 200;

        height = myGameArea.canvas.height;

        minGap = 45;
        maxGap = 100;

        gap = Math.floor(Math.random() * maxGap) + minGap;

        var a;

        a = height - 42;

        //defH1 -= 42;
        pos = Math.floor(Math.random() * a) + 42;
        //pos -= 55;
        defH2 = pos;//-Math.abs(pos);

        pos = 325 - defH2;
        pos += gap;
        pos = -Math.abs(pos);
        defH1 = pos;

        var collisionBox1 = [];
        var collisionBox2 = [];
        collisionBox1 = [new CollisionBox(0, 0, 32, 325)];
        collisionBox2 = [new CollisionBox(0, 0, 32, 325)];

        myObstacles.push(new component(32, 325, x, defH1, "", 1, collisionBox1));
        myObstacles.push(new component(32, 325, x, defH2, "", 2, collisionBox2));
    }

    var count = 0;
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
        if (myObstacles[i].x + myObstacles[i].width < 0) {
            myNewObstacles[count] = i;
            count++;

        }
    }

    //if (myNewObstacles.length > 0) {

    //    for (x = 0; x < myNewObstacles.length; x++) {
    //        //myObstacles[myNewObstacles[x]].remove
    //        myObstacles.indexOf(x).remove;
    //        myObstacles.remove(myNewObstacles[x]);

    //    }

    //    //myObstacles = '';
    //    //myObstacles = myNewObstacles;
    //    myNewObstacles = [];
    //}



    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) { return true; }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}