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
}

const   player = new Paddle(20, 100, 'green', 10, cnv.height / 2 - 100 / 2),
        computer = new Paddle(20, 100, 'red', cnv.width-30,cnv.height / 2 - 100 / 2),
        ball = new Ball(20, 'black', cnv.width / 2 - 10,cnv.height / 2 - 10),
        players = [],
        balls = [];

players.push(player, computer);
balls.push(ball);


const bMove = (arr) => {
    
}

const clearScreen = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
}

const run = () => {
    clearScreen();
    Paddle.draw(players, ctx);
    Ball.drawArc(balls, ctx);
};

let timer = setInterval(run, 1000 / 60);