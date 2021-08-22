class Player {
    constructor(ctx, gameWidth, gameHeight, keys) {
        this.ctx = ctx;

        this.width = 80;
        this.height = this.width;

        this.image = new Image();
        this.image.src = "./img/fish.png";

        //Frames of the player sprite
        //this.image.frames = 3;
        //this.image.framesIndex = 0;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.posX = 50;
        this.posY = this.gameHeight - this.height - 400;
        this.posY0 = this.posY;

        this.velY = 1;
        this.gravity = 0.02;

        this.keys = keys;

        this.bubbles = [];

        this.movingLeft = false;
        this.movingRight = false;
        this.movingUp = false;
        this.movingDown = false;

        this.setListeners();
    }

    draw(framesCounter) {
        //sprite changes to appear swimming
        this.swim(framesCounter);

        //goes down with gravity if it moves up
        this.move();

        //draw bubbles
        this.bubbles.forEach((bubble) => bubble.draw());
        this.clearBubbles();
    }

    swim(framesCounter) {
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

        //the framesCounter will be used to animate the sprite in:
        //this.animateSprite(framesCounter);
    }

    animateSprite() {
        return;
    }

    move() {
        //Floating
        if (this.posY < this.gameHeight - this.height && this.posY >= -100) {
            this.posY += this.velY;
        }
        //Going Right
        if ((this.posX < this.gameWidth - this.width) && this.movingRight) {
            this.posX += 10;
        }
        //Going Left
        if ((this.posX > 0) && this.movingLeft) {
            this.posX -= 10;
        }
        //Going Up
        if (this.posY > 0 && this.movingUp) {
            this.posY -= 8;
        }
        //Going Down
        if ((this.posY < this.gameHeight - this.height) && this.movingDown) {
            this.posY += 10;
        }

        //this.velY += this.gravity;

        // else {
        //     //this.posY = this.posY0;
        //     this.velY = 1;
        // }
    }

    setListeners() {
        document.addEventListener("keydown", (e) => {
            //REVISE KEYCODE DEPRECATED
            switch (e.keyCode) {
                case this.keys.UP:
                    this.movingUp = true;
                    break;
                case this.keys.DOWN:
                    this.movingDown = true;
                    break;
                case this.keys.RIGHT:
                    this.movingRight = true;
                    break;
                case this.keys.LEFT:
                    this.movingLeft = true;
                    break;
                case this.keys.SPACE:
                    this.shoot();
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            //REVISE KEYCODE DEPRECATED
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.movingRight = false;
                    break;
                case this.keys.LEFT:
                    this.movingLeft = false;
                    break;
                case this.keys.UP:
                    this.movingUp = false;
                    break;
                case this.keys.DOWN:
                    this.movingDown = false;
                    break;

            }
        });
    }

    goUp() {
        if (this.posY > 0) {
            this.posY -= 90;
        }
    }

    goDown() {
        if (this.posY < this.gameHeight - this.height - 50) {
            this.posY += 90;
        }
    }

    goRight() {
        if (this.posX < this.gameWidth - this.width - 100) {
            this.posX += 20;
        }
    }

    goLeft() {
        if (this.posX > 0 + this.width + 50) {
            this.posX -= 20;
        }
    }

    shoot() {
        this.bubbles.push(
            new Bubbles(
                this.ctx,
                this.posX,
                this.posY,
                this.posY0,
                this.width,
                this.height
            )
        );
    }

    clearBubbles() {
        this.bubbles = this.bubbles.filter(
            (bubble) => bubble.posX <= this.gameWidth
        );
    }
}
