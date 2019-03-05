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
                // playerPoints++;
                break;
            } else if (!this.directionX && (ballL - this.speedX < 0)) {
                collision = 2;
                // compterPoints++;
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
                this.posX = cnv.width / 2 - 10;
                this.posY = cnv.height / 2 - 10;
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

const   player = new Paddle(20, 500, 'green', 10, 0),
        computer = new Paddle(20, 500, 'red', cnv.width-30, 0),
        ball = new Ball(20, 'black', cnv.width / 2 - 10, cnv.height / 2 - 10),
        ball1 = new Ball(20, 'red', cnv.width / 4 - 10, cnv.height / 3 - 10),
        ball2 = new Ball(20, 'green', cnv.width / 4 - 10, cnv.height / 6 - 10),
        ball3 = new Ball(20, 'orange', cnv.width / 6 - 10, cnv.height / 5 - 10),
        ball4 = new Ball(20, 'yellow', cnv.width / 3 - 10, cnv.height / 6 - 10),
        collisionObj = [],
        players = [],
        balls = [];

players.push(player, computer);
balls.push(ball, ball1, ball2, ball3, ball4);
collisionObj.push(player, computer, ball, ball1, ball2, ball3, ball4);

const clearScreen = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
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
};

let timer = setInterval(run, 1000 / 60);