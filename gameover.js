class GameOver {
    constructor(
        ctx,
        gameWidth,
        gameHeight
    ) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.posX = this.gameWidth / 2;
        this.posY = this.gameHeight / 2;
    };

    draw(){
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px 'Press Start 2P'";
        this.ctx.fillText('GAME OVER', this.posX, this.posY);
        this.ctx.strokeText('GAME OVER', this.posX, this.posY);
    };
};