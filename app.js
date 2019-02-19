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
    draw(arr, context) {
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
        this.middleHeight = size / 2;
        this.speedX = 2;
        this.speedY = 2;
        this.directionX = true;
        this.directionY = true;
    }
}

const   player = new Paddle(20, 100, 'green', 10, cnv.height / 2 - 100 / 2),
        computer = new Paddle(20, 100, 'red', cnv.width-30,cnv.height / 2 - 100 / 2),
        ball = new Ball(20, 'black', cnv.width / 2 - 3,cnv.height / 2 - 3);

const collisionObj = [];
collisionObj.push(player, computer, ball);

player.draw(collisionObj, ctx);