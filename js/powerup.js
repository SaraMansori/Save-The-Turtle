class PowerUp {
    constructor(ctx, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.height = 120;
        this.width = this.height;
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.posX = this.gameWidth;
        this.posY = this.randomY();
        this.velX = 3;

        this.image = new Image();
        this.image.src = "./img/power-ups/power-up-sprite.png";

        this.image.frames = 2;
        this.image.framesIndex = 0;
    }

    randomY() {
        return Math.floor(Math.random() * (this.gameHeight - this.height) + 10);
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex *
                Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.move();
    }

    animate(framesCounter) {
        if (framesCounter % 30 === 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }

    move() {
        this.posX -= this.velX;
    }
}
