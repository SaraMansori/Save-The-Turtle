const game = {
    name: "Save the turtles!",
    description: "Clean the ocean and defend the turtle",
    authors: "Alberto, Marta & Sara",

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,

    barsPosY: 0,
    FPS: 60,
    framesCounter: 0,
    secondsCounter: 0,
    seconds: 0,
    points: 0,
    gameStarted: false,

    background: undefined,
    player: undefined,
    pointsBox: undefined,
    levels: undefined,
    life: undefined,

    gameOver: undefined,

    yearCounter: 0,
    year: 2021,

    //Difficulty
    obstaclesVel: 180,
    obstaclesFallingVel: 180,
    enemiesVel: 240,
    powerUpsVel: 90,

    //Generated
    obstacles: [],
    obstaclesFalling: [],
    enemies: [],
    acidBullets: [],
    powerUps: [],
    explosions: [],

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
        this.printStartScreen();
        this.canvas.addEventListener("click", (e) => {
            if (!this.gameStarted) {
                this.start();
                this.gameStarted = true;
            }
        });
    },

    setDimensions() {
        this.width = window.innerWidth * 0.8;
        this.height = window.innerHeight * 0.6;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    printStartScreen() {
        this.startBackground = new Image();
        this.startBackground.src = "./img/background-seamless.jpg";
        this.startBackground.onload = () => {
            this.ctx.drawImage(
                this.startBackground,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.ctx.drawImage(
                this.startBackground,
                0 + this.canvas.width,
                0,
                this.canvas.width,
                this.canvas.height
            );

            //TITLE
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "white";
            this.ctx.font = "60px 'Pacifico'";
            this.ctx.fillText(
                `Save the Turtles!`,
                this.canvas.width / 2,
                this.canvas.height / 2
            );

            //RECTANGLE

            let rectangleHeight = 150;
            this.ctx.fillStyle = "rgba(32, 28, 70, 0.7)";
            this.ctx.fillRect(
                0,
                Math.floor((this.canvas.height * 2) / 3) + 50,
                this.canvas.width,
                rectangleHeight
            );
            this.ctx.fillStyle = "white";
            this.ctx.font = '15px "Press Start 2P"';
            this.ctx.strokeText(
                `Use the arrows to avoid the garbage`,
                this.canvas.width / 2,
                this.canvas.height - rectangleHeight / 2
            );

            this.ctx.font = '15px "Press Start 2P"';
            this.ctx.fillText(
                `Use the arrows to avoid the garbage`,
                this.canvas.width / 2,
                this.canvas.height - rectangleHeight / 2
            );
            this.ctx.font = '15px "Press Start 2P"';
            this.ctx.strokeText(
                "and the space bar to attack with bubbles.",
                this.canvas.width / 2,
                this.canvas.height - 50
            );
            this.ctx.font = '15px "Press Start 2P"';
            this.ctx.fillText(
                `and the space bar to attack with bubbles.`,
                this.canvas.width / 2,
                this.canvas.height - 50
            );

            this.ctx.font = '15px "Press Start 2P"';
            this.ctx.fillText(
                `Click to Play Now!`,
                this.canvas.width / 2,
                this.canvas.height / 2 + 50
            );
            this.ctx.textAlign = "left";
            this.ctx.fillStyle = "white";
        };
    },

    start() {
        this.reset();

        sounds.music.play();

        this.interval = setInterval(() => {
            //SACAR A FUNCIONES

            //To refresh the interval
            this.framesCounter > 5000
                ? (this.framesCounter = 0)
                : this.framesCounter++;

            this.updateScore();
            this.updateYear();
            //this.updateDifficulty();

            this.clear();
            this.drawAll();
            this.generateObstacles();
            this.generateObstaclesFalling();
            this.generateEnemies();
            this.generatePowerUps();
            this.checkAllCollisions();
            this.animateAll();
            this.isGameOver();

            //Clears obstacles that have been hit and the ones that are outside the screen and powerUps
            this.clearObstacles();
            this.clearEnemies();
            this.clearPowerUps();
        }, 1000 / this.FPS);
    },

    animateAll() {
        this.explosions.forEach((explosion) => explosion.animate());
    },

    updateScore() {
        if (this.framesCounter % 60 === 0) {
            this.pointsBox.points++;
        }
    },

    updateYear() {
        //Each 15 seconds the levels year increases by 1
        if (this.framesCounter % 900 === 0) {
            this.levels.year++;
            this.yearCounter++;
            this.obstaclesVel -= 15;
            this.obstaclesFallingVel -= 15;
            this.enemiesVel -= 15;
            this.enemiesVel -= 15;
        }
    },

    checkAllCollisions() {
        if (this.isCollision()) {
            if (this.player.status === "small") {
                this.life.decreaseHealth(10);
            }
            this.player.makeSmall(this.player.status);
        }

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
        this.enemies = [];

        this.framesCounter = 0;
        this.secondsCounter = 0;
        this.seconds = 0;
        this.points = 0;
        this.pointsBox = new Points(
            this.ctx,
            this.width,
            this.height,
            this.points
        );

        this.barsPosY = this.pointsBox.posY;
        this.life = new Life(this.ctx, this.width, this.height, this.barsPosY);
        this.levels = new Levels(this.ctx, this.width, this.height, this.year);
        this.gameOver = new GameOver(
            this.ctx,
            this.width,
            this.height,
            this.framesCounter
        );
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll() {
        this.background.draw();
        this.explodeBubble();
        this.obstacles.forEach((obs) => obs.draw());
        this.acidBullets.forEach((bullet) => bullet.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.obstaclesFalling.forEach((obs) => obs.draw());
        this.powerUps.forEach((powerUp) => powerUp.draw());
        this.player.draw(this.framesCounter);
        this.pointsBox.draw();
        this.life.draw();
        this.levels.draw();
    },

    generateObstacles() {
        if (
            this.yearCounter >= 0 &&
            this.framesCounter % this.obstaclesVel === 0
        ) {
            this.obstacles.push(
                new Obstacle(this.ctx, this.width, this.height)
            );
        }
    },

    generateObstaclesFalling() {
        //FIRST YEAR/LEVEL
        if (
            this.yearCounter > 0 &&
            this.framesCounter % this.obstaclesFallingVel === 0
        ) {
            this.obstaclesFalling.push(
                new ObstacleFalling(this.ctx, this.width, this.height)
            );
        }
    },

    generateEnemies() {
        if (
            this.yearCounter >= 0 &&
            this.framesCounter % this.enemiesVel === 0
        ) {
            //Each 5 seconds an emeny appears beginning on the year 1
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
    },

    generatePowerUps() {
        //Each 15 seconds a power up appears beginning on the year 1
        if (this.framesCounter % 900 === 0 && this.yearCounter > 0) {
            this.powerUps.push(new PowerUp(this.ctx, this.width, this.height));
        }
    },

    //CLEARING ELEMENTS

    clearObstacles() {
        this.obstacles.forEach((obs) => {
            if (this.checkCollision(obs)) {
                this.explosions.push(
                    new Explosion(this.ctx, obs.posX, obs.posY)
                );
            }
        });

        this.obstacles = this.obstacles.filter(
            (obs) => obs.posX + obs.width >= 0 && !this.checkCollision(obs)
        );

        this.obstaclesFalling = this.obstaclesFalling.filter(
            (obs) => obs.posY <= this.height && !this.checkCollision(obs)
        );
    },

    explodeBubble() {
        this.explosions.forEach((bubble, i) => {
            bubble.explode();
            bubble.timer === 90 ? this.explosions.splice(i, 1) : null;
        });
    },

    clearEnemies() {
        this.enemies = this.enemies.filter(
            (enemy) => enemy.posX + enemy.width >= 0
        );
    },

    clearPowerUps() {
        this.powerUps = this.powerUps.filter(
            (powerUp) =>
                powerUp.posX + powerUp.width >= 0 &&
                !this.checkCollision(powerUp)
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

    isGameOver() {
        if (this.life.health <= 0) {
            clearInterval(this.interval); //
            this.life.health = 0;
            this.life.barWidth = 0;
            this.clear();
            this.drawAll();
            this.gameStarted = false;
            this.gameOver.draw();
            sounds.music.pause();
        }
    },
};
