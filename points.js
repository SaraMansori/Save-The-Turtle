class Points {
    constructor(ctx, gameWidth, gameHeigth, points) {
        this.ctx = ctx;
        this.width = gameWidth;
        this.gameHeigth = gameHeigth;
        this.width = 200;
        this.height = this.width / 4;
        this.points = points;

        this.posX = 30;
        this.posY = 60;
    }

    draw() {
        this.ctx.fillStyle = "white";
        //CHANGE THE FONT TO PRESS START 2
        //this.ctx.font = "48px serif";
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillText(`POINTS: ${this.points}`, this.posX, this.posY);
    }
}
