class Enemies {
    constructor(
        ctx,
        gameWidth,
        gameHeight,
        playerX,
        playerY,
        playerWidth,
        playerHeight
    ) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 120;
        this.height = 80;
        this.posX = gameWidth;
        this.posY = this.randomY();
        this.posY0 = this.posY;

        this.playerX = playerX;
        this.playerY = playerY;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;

        this.velX = 8;
        this.canShoot = true;

        this.acidCollision = false;

        this.image = new Image();
        this.image.src = "./img/shark.png";

        this.acidBullets = [];
    }

    randomY() {
        return Math.floor(Math.random() * (this.gameHeight - this.height) + 10);
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.move();

        if (this.canShoot === true) {
            this.shoot();
        }

        this.acidBullets.forEach((acid) => acid.draw());
        this.clearAcid();
    }

    move() {
        this.posX -= this.velX;
    }

    shoot() {
        this.acidBullets.push(
            new Acid(
                this.ctx,
                this.posX,
                this.posY,
                this.posY0,
                this.width,
                this.height
            )
        );

        this.canShoot = false;

        let IntervalId = setTimeout(() => {
            this.canShoot = true;
        }, 1000);
    }

    clearAcid() {
        this.acidBullets = this.acidBullets.filter(
            (acid) => acid.posX <= this.gameWidth && !game.checkCollision(acid)
        );
    }

    checkAcidCollision() {
        return (
            this.acidBullets.filter((acid) => game.checkCollision(acid))
                .length > 0
        );
    }
}
