class Levels {
    constructor(ctx, gameWidth, gameHeight, year) {
        this.ctx = ctx;
        this.width = gameWidth;
        this.height = gameHeight;
        this.year = year;
        this.posX = this.width - 30;
        this.posY = 60;

        this.levelTextAppearPosY = this.gameHeight;
    }

    draw() {
        this.ctx.textAlign = "right";
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillText(`YEAR: ${this.year}`, this.posX, this.posY);
    }

    drawLevelText() {
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillText(
            `YEAR: ${this.year}`,
            this.gameWidth / 2,
            this.levelTextAppearPosY
        );
    }
}
