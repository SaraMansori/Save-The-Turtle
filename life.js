class Life {
    constructor(
        ctx,
        gameWidth,
        gameHeight,
        barsPosY,
        barWidth,
        barHeight,
        barX,
        barY,
        barColor,
        barHealth
    ) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.barWidth = 400;
        this.barHeight = 25;
        this.barX = this.gameWidth / 2 - this.barWidth / 2;
        this.barY = barsPosY - this.barHeight;
        this.textX = this.gameWidth / 2;
        this.barColor = "cyan";
        this.barHealth = 100;
    }

    drawBar() {
        this.ctx.fillStyle = this.barColor;
        this.ctx.fillRect(this.barX, this.barY, this.barWidth, this.barHeight);

        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            this.barHealth + "/100",
            this.textX,
            this.barY + this.barHeight
        );
    }

    decreaseHealth() {
        this.barHealth -= 10;
    }
}
