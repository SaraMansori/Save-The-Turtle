class Obstacle {
    constructor(ctx, gameWidth, gameHeigth) {
        this.ctx = ctx;
        this.width = 50;
        this.height = this.width;
        this.gameHeigth = gameHeigth;
        this.gameWidth = gameWidth;
        this.posX = gameWidth;
        this.posY = this.randomY();
        this.velX = 5;
    }

    randomY() {
        return Math.floor(Math.random() * this.gameHeigth + 10);
    }

    draw() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
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
    }

    randomX(gameWidth) {
        return Math.floor(Math.random() * (gameWidth - 300) + 300);
    }

    fall() {
        this.posY += this.velY;
        this.velY += this.gravity;
    }

    draw() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.fall();
    }
}
