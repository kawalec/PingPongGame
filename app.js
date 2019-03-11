const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

cnv.width = 1000;
cnv.height = 500;

class Paddle {
    constructor(width, height, color, posX, posY) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.speedY = 1;
        this.middleHeight = height / 2;
    }
    static draw(arr, context) {
        arr.forEach(el => {
            context.fillStyle = el.color;
            context.fillRect(el.posX, el.posY, el.width, el.height)
        });
    }
}

class Ball extends Paddle {
    constructor(size, color, posX, posY) {
        super(null, null, color, posX, posY);
        this.width = size;
        this.height = size;
        this.size = size;
        this.middleHeight = size / 2;
        this.speedX = 2;
        this.speedY = 2;
        this.directionX = true;
        this.directionY = true;
    }
    static drawArc(arr, context) {
        arr.forEach(el => {
            context.fillStyle = el.color;
            context.beginPath();
            context.arc(el.posX,el.posY,el.size,0,2*Math.PI);
            context.closePath();
            context.fill();
        });
    }

    move(collisionObj) {
        let collision = 0;
        const ballL = this.posX,
              ballR = this.posX + this.width,
              ballT = this.posY,
              ballB = this.posY + this.height;

        for(let i = 0; i < collisionObj.length; i++) {
            let objL = collisionObj[i].posX,
                objR = collisionObj[i].posX + collisionObj[i].width,
                objT = collisionObj[i].posY,
                objB = collisionObj[i].posY + collisionObj[i].height;
            if(this === collisionObj[i]) {  // pomijamy kolizie z samym sobą
                continue;
            } else if(((objL <= ballL && ballL <= objR) || (objL <= ballR && ballR <= objR)) && ((objT <= ballT && ballT <= objB) || (objT <= ballB && ballB <= objB))) {   // pomijamy początkowy moment zawierania się objektów w sobie
                this.directionX = !this.directionX;
                break;
            } 
            if(this.directionX && (ballR + this.speedX > cnv.width)) {
                collision = 2;
                playerPoints++;
                playerScoreBoard.setPoints(playerPoints);
                break;
            } else if (!this.directionX && (ballL - this.speedX < 0)) {
                collision = 2;
                compterPoints++;
                computerScoreBoard.setPoints(compterPoints);
                break;
            }
            if(this.directionY && (ballB + this.speedY > cnv.height)) {
                collision = 3;
                break;
            } else if(!this.directionY && (ballT - this.speedY < 0)) {
                collision = 3;
                break;
            }
            if(this.directionX && this.directionY) {
                if ((ballL < objR && ((objL <= ballR + this.speedX && ballR + this.speedX <= objR) || (objL <= ballL + this.speedX && ballL + this.speedX <= objR))) && (ballT < objB && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB + this.speedY && ballB + this.speedY <= objB)))) {
                    collision = 1;
                    break;
                }
            } else if(this.directionX && !this.directionY) {
                if((ballL < objR && ((objL <= ballR + this.speedX && ballR + this.speedX <= objR) || (objL <= ballL + this.speedX && ballL + this.speedX <= objR))) && (ballB > objT && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB - this.speedY && ballB - this.speedY <= objB)))) {
                    collision = 1;
                    break;
                }
            } else if(!this.directionX && this.directionY) {
                if ((ballR > objL && ((objL <= ballR - this.speedX && ballR - this.speedX <= objR) || (objL <= ballL - this.speedX && ballL - this.speedX <= objR))) && (ballT < objB && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB + this.speedY && ballB + this.speedY <= objB)))) {
                    collision = 1;
                    break;
                }
            } else {
                if((ballR > objL && ((objL <= ballR - this.speedX && ballR - this.speedX <= objR) || (objL <= ballL - this.speedX && ballL - this.speedX <= objR))) && (ballB > objT && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB - this.speedY && ballB - this.speedY <= objB)))) {
                    collision = 1;
                    break;
                }
            }
        }

        if(collision) {
            this.speedX += .1;
            this.speedY += .1;
            if(collision == 1) {
                this.directionX = !this.directionX;
                this.directionY = !this.directionY;
            } else if(collision == 2) {
                ballFirstMove(balls);
                this.speedX = 2;
                this.speedY = 2;
                this.posX = cnv.width / 2 - this.size / 2;
                this.posY = cnv.height / 2 - this.size / 2;
            } else if(collision == 3) {
                this.directionY = !this.directionY;
            }
        } else {
            if(this.directionX) {
                this.posX += this.speedX;
            } else {
                this.posX -= this.speedX;
            }
            if(this.directionY) {
                this.posY += this.speedY;
            } else {
                this.posY -= this.speedY;
            }
        }
    }
}

class Score {
    constructor(posX, posY) {
        this.points = 0;
        this.posX = posX;
        this.posY = posY;
        this.width = 50;
        this.height = 30;
        this.color = 'black';
    }
    setPoints(points) {
        this.points = points;
    }
    getPoints() {
        return points;
    }
    resetPoints() {
        this.points = 0;
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = '1';
        context.strokeStyle = this.color;
        context.rect(this.posX, this.posY, this.width, this.height);
        context.font = "28px Roboto";
        context.fillText(this.points, this.posX + this.width / 3, this.posY + this.height / 1.2);
        context.stroke();
    }
}

const   player = new Paddle(20, 10, 'green', 10, 200),
        computer = new Paddle(20, 10, 'red', cnv.width-30, 200),
        ball = new Ball(15, 'black', cnv.width / 2 - 10, cnv.height / 2 - 10),
        players = [],
        balls = [],
        collisionObj = [],
        playerScoreBoard = new Score(20, 20),
        computerScoreBoard = new Score(cnv.width - 70, 20);

let playerPoints = 0, 
    compterPoints = 0;

players.push(player, computer);
balls.push(ball);
collisionObj.push(player, computer, ball);

let getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

let getRandomColor = () => {
    return "#" + Math.random().toString(16).slice(2,8);
}

let getRandomDirection = (el) => {
    let num1 = Math.round(Math.random()),
        num2 = Math.round(Math.random());
    el.directionX = num1;
    el.directionY = num2;
}

const clearScreen = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
}

const ballFirstMove = balls => {
    balls.forEach(el => {
        getRandomDirection(el);
    })
}

const ballMove = balls => {
    balls.forEach(el => {
        el.move(collisionObj);
    });
}

const run = () => {
    clearScreen();
    ballMove(balls);
    Paddle.draw(players, ctx);
    Ball.drawArc(balls, ctx);
    playerScoreBoard.draw(ctx);
    computerScoreBoard.draw(ctx);
};

let timer = setInterval(run, 1000 / 60);