class HealthIndicators {
    constructor(ctx, type, playerX, playerY) {
        this.ctx = ctx;
        this.playerX = playerX;
        this.playerY = playerY;

        this.speed = 2;
        this.posX = this.playerX;
        this.posY = this.playerY;

        this.timer = 0;
        this.timerSpeed = 8;

        this.width = 100;
        this.height = this.width / 5;

        this.image = new Image();
        this.type = type;
        this.imagesArray = [
            "./img/health-icons/one-damage.png",
            "./img/health-icons/ten-damage.png",
            "./img/health-icons/twenty-damage.png",
            "./img/health-icons/twentyfive-damage.png",
            "./img/health-icons/fifteen-health.png",
        ];
        this.image.src = this.chooseImage();
    }

    chooseImage() {
        switch (this.type) {
            case "enemy":
                return this.imagesArray[0];
                break;
            case "obstacle":
                return this.imagesArray[1];
                break;
            case "obstacleFalling":
                return this.imagesArray[2];
                break;
            case "acid":
                return this.imagesArray[3];
                break;
            case "powerUp":
                return this.imagesArray[4];
                break;
        }
    }

    draw() {
        this.timer += this.timerSpeed;
        this.alpha = this.currAlpha * 0.1;
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
        this.posY -= this.speed;
    }
}
