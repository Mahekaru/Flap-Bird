﻿var myGamePiece;
var myObstacles = [];
var myNewObstacles = [];
var myScore;
var bird = document.getElementById("bird");
var pipe1 = document.getElementById("pipe1");
var pipe2 = document.getElementById("pipe2");
var gameArea;

function startGame() {
    myGamePiece = new component(30, 30, 100, 245, "runner",0);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", 280, 40, "text",0);
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

function component(width, height, x, y, type, rotation) {

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

                if (this.status === 'running') {
                    this.height = 30;
                }
                else {
                    this.height = 15;
                }
                ctx.drawImage(bird, this.x, this.y, this.width, this.height);
            }
            else {
                ctx.save();

                if (this.rotation === 1) {
                    //ctx.drawImage(pipe1, 3, 3, 32, 132);
                    ctx.drawImage(pipe2, this.x, this.y, this.width, this.height);
                }
                else {
                    ctx.drawImage(pipe1, this.x, this.y, this.width, this.height);
                }

            }
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
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;

        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);

        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }


        return crash;
    };
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

        //defH2 = myGameArea.canvas.height - 132;
        //defH1 = -Math.abs(myGameArea.canvas.height / 2);


        //height = Math.floor(Math.random(maxHeight,minHeight) * (maxHeight - minHeight + 1) + minHeight);
        height = myGameArea.canvas.height;

        minGap = 45;
        maxGap = 100;

        gap = Math.floor(Math.random() * maxGap) + minGap;

        //defH1 = myGameArea.canvas.height - 325;
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

        //defH2 = pos;

        //defH1 -= 325;
        //defH1 = -Math.abs(defH1);

        //defH2 = myGameArea.canvas.height;
        //defH2 += gap;
        //pos = Math.floor(Math.random() * myGameArea.canvas.height) + 1;
        //pos += gap;
        //pos = -Math.abs(pos);

        //color = Math.floor(Math.random() * 10);

        myObstacles.push(new component(32, 325, x, defH1, "", 1));
        myObstacles.push(new component(32, 325, x, defH2,"",2));
    }

    var count = 0;
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
        if (myObstacles[i].x + myObstacles[i].width < 0) {
            myNewObstacles[count] = i;
            count++;
            //console.log('OOB');
            //myObstacles.remove(i);

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