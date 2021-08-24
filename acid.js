class Acid {
    constructor(
        ctx,
        enemyPosX,
        enemyPosY,
        enemyPosY0,
        enemyWidth,
        enemyHeight
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

        this.image = new Image();
        this.image.src = "./img/greenflame.png";

        this.velX = 10;
        this.velY = 0.2;
    }

    randomSize() {
        return Math.floor(Math.random() * 30) + 30;
    }

    draw() {
        //this.ctx.fillStyle = "purple";
        //this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.move();
    }

    move() {
        this.posX -= this.velX;
    }
}
