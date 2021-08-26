class Banner {
    constructor(ctx, text, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.text = text;
        this.speed = 2;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.posX = this.gameWidth / 2;
        this.posY = this.gameHeight;
    }
    draw() {
        this.move();

        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "rgb(255,255,255, 0.7)";
        this.ctx.font = '35px "Press Start 2P"';
        this.ctx.fillText(this.text, this.posX, this.posY);
    }

    move() {
        this.posY -= this.speed;
    }
}
