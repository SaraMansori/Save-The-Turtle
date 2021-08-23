class Player {
    constructor(ctx, gameWidth, gameHeight, keys) {
        this.ctx = ctx;

        //SIZE
        this.status = "medium";

        //MEDIUM
        this.width = 80;
        this.height = this.width;

        //SMALL
        this.widthS = 60;
        this.heightS = this.widthS;

        //BIG
        this.widthL = 100;
        this.heightL = this.widthL;

        //IMAGE
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

        //BUBBLES ATTACK
        this.bubbles = [];

        //MOVEMENT
        this.keys = keys;
        this.movingLeft = false;
        this.movingRight = false;
        this.movingUp = false;
        this.movingDown = false;

        this.setListeners();

        this.velY = 1;
        this.gravity = 0.02;
    }

    draw(framesCounter) {
        //sprite changes to appear swimming
        // this.swim(framesCounter);

        switch (this.status) {
            case "medium":
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
                break;
            case "small":
                this.ctx.drawImage(
                    this.image,
                    this.posX,
                    this.posY,
                    this.widthS,
                    this.heightS
                );
                break;
            case "big":
                this.ctx.drawImage(
                    this.image,
                    this.posX,
                    this.posY,
                    this.widthL,
                    this.heightL
                );
                break;
        }

        //goes down with gravity if it moves up
        this.move();

        //draw bubbles
        this.bubbles.forEach((bubble) => bubble.draw());
        this.clearBubbles();
    }

    // swim(framesCounter) {
    //     //the framesCounter will be used to animate the sprite in:
    //     //this.animateSprite(framesCounter);
    // }

    // animateSprite() {
    //     return;
    // }

    move() {
        //Floating
        if (this.posY < this.gameHeight - this.height && this.posY >= -100) {
            this.posY += this.velY;
        }
        //Going Right
        if (this.posX < this.gameWidth - this.width && this.movingRight) {
            this.posX += 10;
        }
        //Going Left
        if (this.posX > 0 && this.movingLeft) {
            this.posX -= 10;
        }
        //Going Up
        if (this.posY > 0 && this.movingUp) {
            this.posY -= 8;
        }
        //Going Down
        if (this.posY < this.gameHeight - this.height && this.movingDown) {
            this.posY += 10;
        }
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

    changeStatus(status) {
        this.status = status;
    }
}
