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
        this.image.src = "./img/power-ups/power-up.png";
    }

    randomY() {
        return Math.floor(Math.random() * (this.gameHeight - this.height) + 10);
    }

    draw() {
        //this.ctx.fillStyle = "red";
        //this.ctx.fillRect(this.posX, 100, 50, 50);

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
    }
}
