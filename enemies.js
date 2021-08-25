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
        this.imageIndex = this.randomIndex();
        this.image.src = this.randomImage();
    }

    randomIndex() {
        return Math.floor(Math.random() * game.enemiesImages.length);
    }

    randomImage() {
        return game.enemiesImages[this.imageIndex];
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
    }

    move() {
        this.posX -= this.velX;
    }

    shoot() {
        game.acidBullets.push(
            new Acid(
                this.ctx,
                this.posX,
                this.posY,
                this.posY0,
                this.width,
                this.height,
                this.imageIndex
            )
        );

        this.canShoot = false;

        setTimeout(() => {
            this.canShoot = true;
        }, 1000);
    }

    clearAcid() {
        game.acidBullets = game.acidBullets.filter(
            (acid) => acid.posX <= game.gameWidth && !game.checkCollision(acid)
        );
    }
}
