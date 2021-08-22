class Levels {
    constructor(ctx, gameWidth, gameHeigth, levels) {
        this.ctx = ctx;
        this.width = gameWidth;
        this.heigth = gameHeight;
        this.levels = levels;
        this.posX = this.width - 30;
        this.posY = this.height - 60;
    }

    drawLevels() {
        this.ctx.textAlign = "right";
        this.ctx.fillStyle = "black";
        thix.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillText(`YEAR: ${this.levels}`, this.posX, this.posY);
    }
}
