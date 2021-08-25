class Explosion {
    constructor(ctx, elementX, elementY) {
        this.ctx = ctx;
        this.elementX = elementX;
        this.elementY = elementY;

        this.posX = elementX;
        this.posY = elementY;
        this.timer = 0;
        this.timerSpeed = 8;

        this.image = new Image();
        this.image.frames = 7;
        this.image.framesIndex = 0;
        this.image.src = "./img/explosion/bubble-sprite.png";
    }

    explode() {
        this.timer += this.timerSpeed;
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex *
                Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            60,
            60
        );
    }

    animate() {
        this.image.framesIndex++;
    }
}
