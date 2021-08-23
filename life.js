class Life {
    constructor(
        ctx,
        gameWidth,
        gameHeight,
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
        this.barX = (this.gameWidth / 2) - (this.barWidth / 2);
        this.barY = 20;
        this.barColor = 'cyan';
        this.barHealth = 100
    };

    drawBar() {
        this.ctx.fillStyle = this.barColor;
        this.ctx.fillRect(this.barX, this.barY, this.barWidth, this.barHeight);
        this.ctx.font = "16px Sans-serif";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText(this.barHealth + "/100", this.barX + 170, this.barY + this.barY);
        this.ctx.arc(25, 25, 50, 2, 2 * Math.PI);
        
    };
};
