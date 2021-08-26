class Obstacle {
    constructor(ctx, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.height = 60;
        this.width = this.height / 1.2;
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.posX = gameWidth;
        this.posY = this.randomY();
        this.velX = 5;

        this.image = new Image();
        this.image.src = this.randomImage();
    }

    randomY() {
        return Math.floor(Math.random() * (this.gameHeight - this.height) + 10);
    }

    randomImage() {
        let i = Math.floor(Math.random() * game.obstaclesImages.length);
        return game.obstaclesImages[i];
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.move();
    }

    move() {
        this.posX -= this.velX;
        let down = false;
        if (!down) {
            down = true;
            this.posY += this.velX;
        }
        if (down) {
            this.posY -= this.velX;
        }
    }
}

class ObstacleFalling extends Obstacle {
    constructor(ctx, width, height, gameHeight, posX, posY, velX) {
        super(ctx, width, height, gameHeight, posX, posY, velX);

        this.posX = this.randomX(this.gameWidth);
        this.posY = 0;
        this.height = 100;
        this.width = this.height;
        this.velY = 2;
        this.gravity = 0.2;

        this.image = new Image();
        this.image.src = "./img/trash/trashbag.png";
    }

    randomX(gameWidth) {
        return Math.floor(Math.random() * (gameWidth - this.width));
    }

    fall() {
        this.posY += this.velY;
        this.velY += this.gravity;
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        //this.ctx.fillStyle = "green";
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.fall();
    }
}
