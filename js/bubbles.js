class Bubbles {
    constructor(
        ctx,
        playerPosX,
        playerPosY,
        playerPosY0,
        playerWidth,
        playerHeight
    ) {
        this.ctx = ctx;
        this.posX = playerPosX + playerWidth;
        this.posY = playerPosY + playerHeight / 2;

        this.playerPosY0 = playerPosY0;
        this.playerHeight = playerHeight;
        this.radius = this.randomRadius();

        this.image = new Image();
        this.image.src = "./img/bubble.png";
        this.width = this.randomRadius();
        this.height = this.width;

        this.velX = 10;
        this.velY = 0.2;

        //this.gravity = 1;
    }

    randomRadius() {
        return Math.floor(Math.random() * 40) + 30;
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            // to manage the sprites
            // this.image.framesIndex *
            //     Math.floor(this.image.width / this.image.frames),
            // 0,
            // Math.floor(this.image.width / this.image.frames),
            // this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        // this.ctx.beginPath();
        // //this.ctx.fillStyle = "white";
        // this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        // this.ctx.fill();
        // this.ctx.closePath();
        this.move();
    }

    move() {
        this.posX += this.velX;
        this.posY -= this.velY;

        //this.velY += this.gravity;

        // if (this.posY >= this.playerPosY0 + this.playerHeight) {
        //     this.velY *= -1;
        // }
    }
}
