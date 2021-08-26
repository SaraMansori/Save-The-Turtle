class GameOver {
    constructor(ctx, gameWidth, gameHeight, framesCounter) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.posX = this.gameWidth / 2;
        this.posY = this.gameHeight / 2;
        this.borderX = this.posX - (game.width * 0.6) / 2;
        this.borderY = this.posY - (game.height * 0.5) / 2;
        this.borderWidth = game.width * 0.6;
        this.borderHeight = game.height * 0.5;
        this.framesCounter = framesCounter;
    }

    draw() {
        this.ctx.fillStyle = "rgba(32, 28, 70, 0.7)";
        this.ctx.fillRect(
            this.borderX,
            this.borderY,
            this.borderWidth,
            this.borderHeight
        );
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(
            this.borderX,
            this.borderY,
            this.borderWidth,
            this.borderHeight
        );
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px 'Press Start 2P'";
        this.ctx.fillText("GAME OVER", this.posX, this.posY - 60);
        this.ctx.strokeText("GAME OVER", this.posX, this.posY - 60);
        this.ctx.font = "15px 'Press Start 2P'";
        this.ctx.fillText(
            `You survived until year ${game.levels.year}`,
            this.posX,
            this.posY - 30
        );
        this.ctx.fillText(
            `with ${game.pointsBox.points} points`,
            this.posX,
            this.posY
        );

        if (game.highScore() > game.previousHighScore) {
            this.ctx.font = "25px 'Press Start 2P'";
            this.ctx.fillStyle = "#93e6ff";
            this.ctx.fillText(
                `NEW HIGHEST SCORE: ${game.highScore()}`,
                this.posX,
                this.posY + 50
            );
        }

        if (game.highScore() <= game.previousHighScore) {
            this.ctx.font = "15px 'Press Start 2P'";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(
                `The highest score is ${game.highScore()}`,
                this.posX,
                this.posY + 30
            );
        }

        this.ctx.font = '25px "Press Start 2P"';
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        setTimeout(() => {
            //setInterval giving bugs
            this.ctx.fillText("Click to Play again", this.posX, this.posY + 90);
            this.ctx.strokeText(
                "Click to Play again",
                this.posX,
                this.posY + 90
            );
        }, 1000);
    }
}
