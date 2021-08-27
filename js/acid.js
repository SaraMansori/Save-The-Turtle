class Acid {
    constructor(
        ctx,
        enemyPosX,
        enemyPosY,
        enemyPosY0,
        enemyWidth,
        enemyHeight,
        imageIndex
    ) {
        this.ctx = ctx;
        this.enemyPosY0 = enemyPosY0;
        this.enemyWidth = enemyWidth;
        this.posX0 = enemyPosX;
        this.posX = this.posX0;
        this.posY0 = enemyPosY + enemyHeight / 2.5;
        this.posY = this.posY0;
        this.enemyHeight = enemyHeight;

        this.size = this.randomSize();
        this.width = this.size * 1.8;
        this.height = this.size;

        this.imageIndex = imageIndex;

        this.image = new Image();
        this.image.src = "./img/acid/green-acid.png";

        this.blueAcidImage = new Image();
        this.blueAcidImage.src = "./img/acid/blue-acid.png";

        this.redAcidImage = new Image();
        this.redAcidImage.src = "./img/acid/red-acid.png";

        this.velX = 10;
        this.velY = 0.2;
    }

    randomSize() {
        return Math.floor(Math.random() * 30) + 30;
    }

    draw() {
        this.ctx.drawImage(
            this.acidColor(),
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.move();
    }

    acidColor() {
        if (this.imageIndex === 0) {
            return this.image;
        } else if (this.imageIndex === 1) {
            return this.blueAcidImage;
        } else if (this.imageIndex === 2) {
            return this.redAcidImage;
        }
    }

    move() {
        this.posX -= this.velX;
    }

    clearAcid() {
        game.acidBullets = game.acidBullets.filter(
            (acid) => acid.posX <= game.gameWidth && !game.checkCollision(acid)
        );
        game.clearHealthIndicator(game.acidBullets, "acid");
    }
}
