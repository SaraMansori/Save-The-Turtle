class Player {
    constructor(ctx, gameWidth, gameHeight, keys) {
        this.ctx = ctx;

        this.width = 100;
        this.height = 150;

        this.image = new Image();
        this.image.src = "./img/player.png";

        //Frames of the player sprite
        this.image.frames = 3;
        this.image.framesIndex = 0;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.posX = 50;
        this.posY = this.gameHeight - this.height - 400;
        this.posY0 = this.posY;

        this.velY = 1;
        this.gravity = 0.02;

        this.keys = keys;

        this.bubbles = [];

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
            this.image.framesIndex *
                Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
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
        if (this.posY < this.gameHeight - this.height && this.posY >= -100) {
            this.posY += this.velY;
            //this.velY += this.gravity;
        }
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
                    this.goUp();
                    break;
                case this.keys.DOWN:
                    this.goDown();
                    break;
                case this.keys.RIGHT:
                    this.goDown();
                    break;
                case this.keys.SPACE:
                    this.shoot();
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
