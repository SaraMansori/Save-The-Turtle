class Obstacle {
    constructor(ctx, gameWidth, gameHeigth) {
        this.ctx = ctx;
        this.height = 50;
        this.width = this.height * 1.5;
        this.gameHeigth = gameHeigth;
        this.gameWidth = gameWidth;
        this.posX = gameWidth;
        this.posY = this.randomY();
        this.velX = 5;

        this.image = new Image()
        this.image.src = './img/can.png'
    }

    randomY() {
        return Math.floor(Math.random() * (this.gameHeigth - this.height) + 10);
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.move();
    }

    move() {
        this.posX -= this.velX;
    }
}

class ObstacleFalling extends Obstacle {
    constructor(ctx, width, height, gameHeigth, posX, posY, velX) {
        super(ctx, width, height, gameHeigth, posX, posY, velX);

        this.posX = this.randomX(this.gameWidth);
        this.posY = 0;
        this.velY = 3;
        this.gravity = 0.2;

        this.image = new Image()
        this.image.src = './img/trash.png'
    }

    randomX(gameWidth) {
        return Math.floor(Math.random() * (gameWidth - (this.width - 300)));
    }

    fall() {
        this.posY += this.velY;
        this.velY += this.gravity;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        //this.ctx.fillStyle = "green";
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.fall();
    }
}
