const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

cnv.width = 1000;
cnv.height = 500;

class Paddle {
    constructor(posX, posY, width, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedY = 3;
        this.middleHeight = height / 2;
    }
}

class Ball extends Paddle {
    constructor(posX, posY, width, height, color) {
        super(posX, posY, width, height, color);
        this.size = width;
        this.speedX = 2;
        this.speedY = 2;
        this.directionX = true;
        this.directionY = true;
    }
}

const drawObj = (collisionObj, context) => {
    collisionObj.forEach(collisionObj => {
        console.log(collisionObj);
        context.fillStyle = collisionObj.color;
        context.fillRect(collisionObj.posX, collisionObj.posY, collisionObj.width, collisionObj.height)
    });
}

const   player1 = new Paddle(10, cnv.height / 2 - 100 / 2, 20, 100, 'green'),
        player2 = new Paddle(cnv.width-30,cnv.height / 2 - 100 / 2, 20, 100, 'green'),
        pilka = new Ball(cnv.width / 2 - 3,cnv.height / 2 - 3, 6, 6, 'red');

const collisionObj = [];
collisionObj.push(player1, player2, pilka);

drawObj(collisionObj, ctx);

console.log(collisionObj);