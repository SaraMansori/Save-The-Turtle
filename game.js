const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,

    barsPosY: 0,
    FPS: 60,
    framesCounter: 0,
    secondsCounter: 0,
    points: 0,

    background: undefined,
    player: undefined,
    pointsBox: undefined,
    levels: undefined,
    life: undefined,

    gameOver: undefined,

    yearCounter: 0,
    year: 2021,
    obstacles: [],
    obstaclesFalling: [],
    enemies: [],
    acidBullets: [],
    powerUps: [],

    //GRAPHICS

    enemiesImages: [
        "./img/enemies/enemy.png",
        "./img/enemies/enemy2.png",
        "./img/enemies/enemy3.png",
    ],

    obstaclesImages: [
        "./img/trash/barrel1.png",
        "./img/trash/bottle1.png",
        "./img/trash/bottle2.png",
    ],

    keys: {
        UP: 38,
        DOWN: 40,
        RIGHT: 39,
        LEFT: 37,
        SPACE: 32,
    },

    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        this.start();
    },

    setDimensions() {
        this.width = window.innerWidth * 0.8;
        this.height = window.innerHeight * 0.8;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    start() {
        this.reset();

        this.interval = setInterval(() => {
            //SACAR A FUNCIONES

            //To refresh the animation sprite
            this.framesCounter > 6000
                ? (this.framesCounter = 0)
                : this.framesCounter++;

            //Each second the counter resets
            this.secondsCounter > 60
                ? (this.secondsCounter = 0)
                : this.secondsCounter++;

            //Each second a point is added to the PointsBox
            this.secondsCounter > 60
                ? this.pointsBox.points++
                : (this.pointsBox.points = this.pointsBox.points);

            //Each 15 seconds the year counter resets
            this.yearCounter > 900
                ? (this.yearCounter = 0)
                : this.yearCounter++;

            //Each 15 seconds the levels year increases by 1
            this.yearCounter > 900
                ? this.levels.year++
                : (this.levels.year = this.levels.year);

            //Clears the canvas
            this.clear();

            //Draws all the canvas
            this.drawAll();

            //Generates the obstacles floating and falling
            this.generateObstacles();
            this.generateObstaclesFalling();

            //Generates Enemies
            this.generateEnemies();

            this.generatePowerUps();

            //Checks collision and decreases health if isCollision === true

            if (this.isCollision()) {
                if (this.player.status === "small") {
                    this.life.decreaseHealth(10);
                }
                this.player.makeSmall(this.player.status);
            }

            //Checks collision and decreases health if isCollision === true for the falling obstacles
            if (this.isCollisionFalling()) {
                this.player.makeSmall(this.player.status);
                if (this.player.status === "small") {
                    this.life.decreaseHealth(20);
                }
            }

            if (this.isCollisionEnemy()) {
                this.player.makeSmall(this.player.status);
                if (this.player.status === "small") {
                    this.life.decreaseHealth(1);
                }
            }

            if (this.isCollisionAcid()) {
                this.player.makeSmall(this.player.status);
                this.life.decreaseHealth(25);
                this.enemies.forEach((enemy) => enemy.clearAcid());
            }

            this.isCollisionBubbles(this.obstacles)
                ? this.pointsBox.points++
                : null;
            this.isCollisionBubbles(this.obstaclesFalling)
                ? (this.pointsBox.points += 20)
                : null;
            this.isCollisionBubbles(this.enemies)
                ? (this.pointsBox.points += 15)
                : null;

            if (this.isCollisionPowerUp(this.powerUps)) {
                this.life.increaseHealth(15);
                this.player.enlarge(this.player.status);
            }

            //Checks collision and decreases health if isCollision === true for the falling obstacles

            if (this.life.health <= 0) {
                this.gameEnd();
            }

            //console.log(this.powerUps);

            //Clears obstacles that have been hit and the ones that are outside the screen and powerUps
            this.clearObstacles();
            this.clearEnemies();
            this.clearPowerUps();
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(
            this.ctx,
            this.width,
            this.height,
            "./img/background-seamless.jpg"
        );
        this.player = new Player(
            this.ctx,
            this.width,
            this.height,
            this.keys,
            this.framesCounter
        );
        this.obstacles = [];
        this.obstaclesFalling = [];
        this.powerUps = [];
        this.pointsBox = new Points(
            this.ctx,
            this.width,
            this.height,
            this.points
        );
        this.barsPosY = this.pointsBox.posY;
        this.life = new Life(this.ctx, this.width, this.height, this.barsPosY);
        this.levels = new Levels(this.ctx, this.width, this.height, this.year);
        this.gameOver = new GameOver(this.ctx, this.width, this.height);
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll() {
        this.background.draw();
        this.obstacles.forEach((obs) => obs.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.acidBullets.forEach((bullet) => bullet.draw());
        this.obstaclesFalling.forEach((obs) => obs.draw());
        this.powerUps.forEach((powerUp) => powerUp.draw());
        this.player.draw(this.framesCounter);
        this.pointsBox.draw();
        this.life.draw();
        this.levels.draw();
    },

    difficulty(level) {
        switch (level) {
            case 1:
                return 200;
                break;
            case 2:
                return 90;
                break;
            case 3:
                return 60;
                break;
        }
    },

    generateObstacles() {
        if (this.pointsBox.points < 10) {
            if (this.framesCounter % this.difficulty(1) === 0) {
                this.obstacles.push(
                    new Obstacle(this.ctx, this.width, this.height)
                );
            }
        } else if (this.pointsBox.points > 10 && this.pointsBox.points < 20) {
            if (this.framesCounter % this.difficulty(2) === 0) {
                this.obstacles.push(
                    new Obstacle(this.ctx, this.width, this.height)
                );
            }
        } else if (this.pointsBox.points > 20) {
            if (this.framesCounter % this.difficulty(3) === 0) {
                this.obstacles.push(
                    new Obstacle(this.ctx, this.width, this.height)
                );
            }
        }
    },

    generateObstaclesFalling() {
        if (this.pointsBox.points > 15 && this.pointsBox.points < 30) {
            if (this.framesCounter % this.difficulty(1) === 0) {
                this.obstaclesFalling.push(
                    new ObstacleFalling(this.ctx, this.width, this.height)
                );
            }
        } else if (this.pointsBox.points > 30 && this.pointsBox.points < 45) {
            if (this.framesCounter % this.difficulty(2) === 0) {
                this.obstaclesFalling.push(
                    new ObstacleFalling(this.ctx, this.width, this.height)
                );
            }
        } else if (this.pointsBox.points > 45) {
            if (this.framesCounter % this.difficulty(3) === 0) {
                this.obstaclesFalling.push(
                    new ObstacleFalling(this.ctx, this.width, this.height)
                );
            }
        }
    },

    //     if (this.framesCounter % this.difficulty(1) === 0) {
    //         this.obstacles.push(
    //             new Obstacle(this.ctx, this.width, this.height)
    //         );

    //         if (this.pointsBox.points > 15) {
    //             this.obstaclesFalling.push(
    //                 new ObstacleFalling(this.ctx, this.width, this.height)
    //             );
    //         }
    //     }

    // },

    generateEnemies() {
        if (this.framesCounter % 300 === 0) {
            if (this.pointsBox.points > 10) {
                this.enemies.push(
                    new Enemies(
                        this.ctx,
                        this.width,
                        this.height,
                        this.player.posX,
                        this.player.posY,
                        this.player.width,
                        this.player.height
                    )
                );
            }
        }
    },

    generatePowerUps() {
        if (this.framesCounter % 900 === 0) {
            if (this.pointsBox.points > 0) {
                //30
                this.powerUps.push(
                    new PowerUp(this.ctx, this.width, this.height)
                );
            }
        }
        //more than enemies
    },

    //CLEARING

    clearObstacles() {
        this.obstacles = this.obstacles.filter(
            (obs) => obs.posX + obs.width >= 0 && !this.checkCollision(obs)
        );
        this.obstaclesFalling = this.obstaclesFalling.filter(
            (obs) => obs.posY <= this.height && !this.checkCollision(obs)
        );
    },

    clearEnemies() {
        this.enemies = this.enemies.filter(
            (enemy) => enemy.posX + enemy.width >= 0
        );
    },

    clearPowerUps() {
        this.powerUps = this.powerUps.filter(
            (powerUp) =>
                powerUp.posX + enemy.width >= 0 && !this.checkCollision(powerUp)
        );
    },

    //COLLISIONS

    checkCollision(obj) {
        return (
            this.player.posX < obj.posX + obj.width &&
            this.player.posX + this.player.width > obj.posX &&
            this.player.posY < obj.posY + obj.height &&
            this.player.posY + this.player.height > obj.posY
        );
    },

    isCollision() {
        return this.obstacles.some((obs) => {
            const player = {
                x: this.player.posX,
                y: this.player.posY,
                width: this.player.width,
                height: this.player.height,
            };
            let obstacle = {
                x: obs.posX,
                y: obs.posY,
                width: obs.width,
                height: obs.height,
            };
            return (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            );
        });
    },

    isCollisionFalling() {
        return this.obstaclesFalling.some((obs) => {
            const player = {
                x: this.player.posX,
                y: this.player.posY,
                width: this.player.width,
                height: this.player.height,
            };
            let obstacle = {
                x: obs.posX,
                y: obs.posY,
                width: obs.width,
                height: obs.height,
            };
            return (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            );
        });
    },

    isCollisionEnemy() {
        return this.enemies.some((enemy) => {
            const player = {
                x: this.player.posX,
                y: this.player.posY,
                width: this.player.width,
                height: this.player.height,
            };
            let enemyFish = {
                x: enemy.posX,
                y: enemy.posY,
                width: enemy.width,
                height: enemy.height,
            };

            return (
                player.x < enemyFish.x + enemyFish.width &&
                player.x + player.width > enemyFish.x &&
                player.y < enemyFish.y + enemyFish.height &&
                player.y + player.height > enemyFish.y
            );
        });
    },

    isCollisionAcid() {
        return this.acidBullets.some((acid) => {
            const player = {
                x: this.player.posX,
                y: this.player.posY,
                width: this.player.width,
                height: this.player.height,
            };

            let acidBullet = {
                x: acid.posX,
                y: acid.posY,
                width: acid.width,
                height: acid.height,
            };

            return (
                player.x < acidBullet.x + acidBullet.width &&
                player.x + player.width > acidBullet.x &&
                player.y < acidBullet.y + acidBullet.height &&
                player.y + player.height > acidBullet.y
            );
        });
    },

    isCollisionBubbles(targetArr) {
        let collision = false;

        this.player.bubbles.forEach((bubble, i) => {
            for (let i = 0; i < targetArr.length; i++) {
                if (
                    bubble.posX < targetArr[i].posX + targetArr[i].width &&
                    bubble.posX + bubble.width > targetArr[i].posX &&
                    bubble.posY < targetArr[i].posY + targetArr[i].height &&
                    bubble.posY + bubble.height > targetArr[i].posY
                ) {
                    targetArr.splice(i, 1);
                    collision = true;
                }
            }
            collision ? this.player.bubbles.splice(i, 1) : null;
        });

        return collision;
    },

    isCollisionPowerUp() {
        return this.powerUps.some((powerUp, i) => {
            const player = {
                x: this.player.posX,
                y: this.player.posY,
                width: this.player.width,
                height: this.player.height,
            };

            let powerUpEl = {
                x: powerUp.posX,
                y: powerUp.posY,
                width: powerUp.width,
                height: powerUp.height,
            };

            if (
                player.x < powerUpEl.x + powerUpEl.width &&
                player.x + player.width > powerUpEl.x &&
                player.y < powerUpEl.y + powerUpEl.height &&
                player.y + player.height > powerUpEl.y
            ) {
                this.powerUps.splice(i, 1);
                return true;
            }
        });
    },

    gameEnd() {
        clearInterval(this.interval);
        this.life.health = 0;
        this.life.barWidth = 0;
        this.clear();
        this.drawAll();
        this.gameOver.draw();
    },
};
