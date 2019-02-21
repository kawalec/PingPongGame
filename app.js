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
        this.speedY = 3;
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
    move = collisionObj => {
        let collision = 0;
        const ballL = this.posX,
              ballR = this.posX + this.width,
              ballT = this.posY,
              ballB = this.posY + this.height;

        for(let i = 1; i < collisionObj.length; i++) {
            let objL = collisionObj[i].posX,
                objR = collisionObj[i].posx + collisionObj[i].width,
                objT = collisionObj[i].posY,
                objB = collisionObj[i].posY + collisionObj[i].height;
            if(this === collisionObj[i]) {  // pomijamy kolizie z samym sobą
                continue;
            } else if(((objL <= ballL && ballL <= objR) || (objL <= ballR && ballR <= objR)) && ((objT <= ballT && ballT <= objB) || (objT <= ballB && ballB <= objB))) {   // pomijamy początkowy moment zawierania się objektów w sobie
                this.directionX = !this.directionX;
                break;
            } 
            if (this.directionX && this.directionY) {
                if ((ballL < objR && ((objL <= ballR + this.speedX && ballR + this.speedX <= objR) || (objL <= ballL + this.speedX && ballL + this.speedX <= objR))) && (ballT < objB && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB + this.speedY && ballB + this.speedY <= objB)))) {
                    break;
                }
            } else if (this.directionX && !this.directionY) {
                if ((ballL < objR && ((objL <= ballR + this.speedX && ballR + this.speedX <= objR) || (objL <= ballL + this.speedX && ballL + this.speedX <= objR))) && (ballB > objT && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB - this.speedY && ballB - this.speedY <= objB)))) {
                    break;
                }
            } else if (!this.directionX && this.directionY) {
                if ((ballR > objL && ((objL <= ballR - this.speedX && ballR - this.speedX <= objR) || (objL <= ballL - this.speedX && ballL - this.speedX <= objR))) && (ballT < objB && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB + this.speedY && ballB + this.speedY <= objB)))) {
                    break;
                }
            } else {
                if ((ballR > objL && ((objL <= ballR - this.speedX && ballR - this.speedX <= objR) || (objL <= ballL - this.speedX && ballL - this.speedX <= objR))) && (ballB > objT && ((objT <= ballT - this.speedY && ballT - this.speedY <= objB) || (objT <= ballB - this.speedY && ballB - this.speedY <= objB)))) {
                    break;
                }
            }
        }
    }
}

const   player = new Paddle(20, 100, 'green', 10, cnv.height / 2 - 100 / 2),
        computer = new Paddle(20, 100, 'red', cnv.width-30,cnv.height / 2 - 100 / 2),
        ball = new Ball(20, 'black', cnv.width / 2 - 10,cnv.height / 2 - 10),
        collisionObj = [],
        players = [],
        balls = [];

players.push(player, computer);
balls.push(ball);
collisionObj.concat(players, balls);

const ballMove = balls => {
    balls.forEach(balls => {
        balls.move(collisionObj);
    });
}

const clearScreen = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
}

const run = () => {
    clearScreen();
    ballMove(balls);
    Paddle.draw(players, ctx);
    Ball.drawArc(balls, ctx);
};

let timer = setInterval(run, 1000 / 60);