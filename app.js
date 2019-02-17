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



const player = new Paddle(10,10,5,20,'white'),
    pilka = new Ball(4,4,2,2,'red');

console.log(player);
console.log(pilka);