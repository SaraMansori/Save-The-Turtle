class Enemies {
    constructor(ctx, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight; 
        this.width = 120;
        this.height = 80;
        this.posX = gameWidth;
        this.posY = this.randomY()
        this.posY0 = this.posY;
        this.velX = 8;

        this.image = new Image()
        this.image.src = './img/shark.png'

        this.acid = [];
    }

    randomY(){
        return Math.floor(Math.random() * (this.gameHeight - this.height) + 10);
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.move();
        this.shoot()

        this.acid.forEach((acid) => acid.draw());
        this.clearAcid();
    }

    move() {
        this.posX -= this.velX;
    }

    shoot() {
        this.acid.push(new Acid(
            this.ctx,
            this.posX,
            this.posY,
            this.posY0,
            this.width,
            this.height
            ))
    }

    clearAcid() {
        this.acid = this.acid.filter(
            (acid) => acid.posX <= this.gameWidth
        );
    }
}