class Player {
    constructor(ctx, gameWidth, gameHeight, keys) {
        this.ctx = ctx;
        this.turtleImageSources = [
            "./img/player/turtle-animation/turtle.png",
            "./img/player/turtle-animation/turtle-shield.png",
            "./img/player/turtle-animation/turtle-shield2.png",
        ];

        //SIZE
        this.status = "medium";
        this.currWidth = 100;

        //MEDIUM
        this.width = 100;
        this.height = this.width / 1.5;

        //SMALL
        this.widthS = 60;
        this.heightS = this.widthS / 1.5;

        //LARGE
        this.widthL = 130;
        this.heightL = this.widthL / 1.5;

        //IMAGES
        this.image = new Image();
        this.image.src = "./img/player/turtle-animation/turtle.png";

        this.imageShield = new Image();
        this.imageShield.src =
            "./img/player/turtle-animation/turtle-shield.png";

        this.imageShield2 = new Image();
        this.imageShield2.src =
            "./img/player/turtle-animation/turtle-shield2.png";

        this.image.frames = 2;
        this.image.framesIndex = 0;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.posX = 50;
        this.posY = this.gameHeight - this.height - 400;
        this.posY0 = this.posY;

        //BUBBLES ATTACK
        this.bubbles = [];
        this.canShoot = true;

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

    draw() {
        switch (this.status) {
            case "medium":
                this.ctx.drawImage(
                    this.imageShield,
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
                break;
            case "small":
                this.ctx.drawImage(
                    this.image,
                    this.image.framesIndex *
                        Math.floor(this.image.width / this.image.frames),
                    0,
                    Math.floor(this.image.width / this.image.frames),
                    this.image.height,
                    this.posX,
                    this.posY,
                    this.widthS,
                    this.heightS
                );
                break;
            case "large":
                this.ctx.drawImage(
                    this.imageShield2,
                    this.image.framesIndex *
                        Math.floor(this.image.width / this.image.frames),
                    0,
                    Math.floor(this.image.width / this.image.frames),
                    this.image.height,
                    this.posX,
                    this.posY,
                    this.widthL,
                    this.heightL
                );
                break;
        }

        this.move();

        //draw bubbles
        this.bubbles.forEach((bubble) => bubble.draw());
        this.clearBubbles();
    }

    animate(framesCounter) {
        if (framesCounter % 30 === 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }

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
                    if (this.canShoot) {
                        this.shoot();
                        this.canShoot = false;
                        sounds.bubbleShot.preload = "auto";
                        sounds.bubbleShot.load();
                        sounds.bubbleShot.play();
                        sounds.bubbleShot.volume = 0.6;
                    }
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
                case this.keys.SPACE:
                    this.canShoot = true;
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

    enlarge(status) {
        switch (status) {
            case "small":
                this.status = "medium";
                break;
            case "medium":
                this.status = "large";
                break;
            case "large":
                this.status = "large";
        }
    }

    makeSmall(status) {
        switch (status) {
            case "small":
                this.status = "small";
                break;
            case "medium":
                this.status = "small";
                sounds.shield.play()
                break;
            case "large":
                this.status = "medium";
                sounds.shield.play()
        }
    }
}
