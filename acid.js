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
        this.posX = enemyPosX;
        this.posY = enemyPosY + (enemyHeight/2);
        this.enemyHeight = enemyHeight;

        this.size = this.randomSize();
        this.width = this.size;
        this.height = this.size;

        this.velX = 10;
        this.velY = 0.2;
    }

    randomSize() {
        return Math.floor(Math.random() * 10) + 20;
    }

    draw() {
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

        this.move();
    }

    move() {
        this.posX -= this.velX;

    }
}
