class Levels {
    constructor(ctx, gameWidth, gameHeight, year) {
        this.ctx = ctx;
        this.width = gameWidth;
        this.heigth = gameHeight;
        this.year = year;
        this.posX = this.width - 30;
        this.posY = 60;
    }

    draw() {
        this.ctx.textAlign = "right";
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillText(`YEAR: ${this.year}`, this.posX, this.posY);
    }
}
