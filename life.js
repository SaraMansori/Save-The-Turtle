class Life {
    constructor(
        ctx,
        gameWidth,
        gameHeight,
        barsPosY,
    ) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.barWidth = 400;
        this.barMaxWidth = 400;
        this.barHeight = 25;
        this.posX = this.gameWidth / 2 - this.barWidth / 2;
        this.posY = barsPosY - this.barHeight;
        this.textX = this.gameWidth / 2;
        this.color = "cyan";
        this.health = 100;
        this.maxHealth = 100;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.barWidth, this.barHeight);
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.strokeRect(this.posX, this.posY, this.barMaxWidth, this.barHeight)
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            this.health + '/' + this.maxHealth,
            this.textX,
            this.posY + this.barHeight
        );
    }

    decreaseHealth() {
        this.health -= 10;
        this.barWidth = (this.health / this.maxHealth) * this.barMaxWidth;
    }
};
