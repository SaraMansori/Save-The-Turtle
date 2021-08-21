class Background {
    constructor(ctx, width, height, imgSource, velX = 2) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = imgSource;

        this.posX = 0;
        this.posY = 0;

        this.velX = velX;
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.ctx.drawImage(
            this.image,
            this.posX + this.width,
            this.posY,
            this.width,
            this.height
        );
        this.move();
    }

    move() {
        this.posX -= this.velX;
        this.posX %= -this.width;
    }
}
