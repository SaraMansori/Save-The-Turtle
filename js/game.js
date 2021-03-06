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
    previousHighScore: localStorage.getItem("highScore") || 0,
    gameStarted: false,

    background: undefined,
    player: undefined,
    pointsBox: undefined,
    levels: undefined,
    levelsBanners: [],
    life: undefined,
    healthIndicators: [],
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

    obstaclesFallingImages: [
        "./img/trash/barrel2.png",
        "./img/trash/barrel3.png",
        "./img/trash/trash-bag.png",
    ],

    keys: {
        UP: 38,
        DOWN: 40,
        RIGHT: 39,
        LEFT: 37,
        SPACE: 32,
    },

    //HIGH SCORE
    highScore() {
        let highScore = localStorage.getItem("highScore") || 0;
        localStorage.setItem("highScore", highScore);

        if (this.pointsBox.points > highScore) {
            highScore = parseInt(this.pointsBox.points);
            localStorage.setItem("highScore", highScore);
        }
        return highScore;
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
                `Save the Turtle!`,
                this.canvas.width / 2,
                this.canvas.height / 2 - 30
            );
            this.ctx.fillStyle = "white";
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(
                this.canvas.width / 2 - 200,
                this.canvas.height / 2,
                400,
                50
            );
            this.ctx.font = '15px "Press Start 2P"';
            this.ctx.fillText(
                `Click to Play`,
                this.canvas.width / 2,
                this.canvas.height / 2 + 32.5
            );
            this.ctx.textAlign = "left";
            this.ctx.fillStyle = "white";
        };
    },

    start() {
        this.reset();

        sounds.music.play();
        sounds.music.volume = 0.4;
        sounds.music.loop = true;

        this.interval = setInterval(() => {
            //To refresh the interval
            this.framesCounter > 5000
                ? (this.framesCounter = 0)
                : this.framesCounter++;

            this.updateScore();
            this.updateYear();

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
            this.clearAcid();
        }, 1000 / this.FPS);
    },

    animateAll() {
        this.explosions.forEach((explosion) => explosion.animate());
        this.player.animate(this.framesCounter);
        this.powerUps.forEach((powerUp) => powerUp.animate(this.framesCounter));
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
            this.levelsBanners.push(
                new Banner(
                    this.ctx,
                    this.levels.year.toString(),
                    this.width,
                    this.height
                )
            );
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
                this.clearHealthIndicator(this.obstacles, "obstacle");
                sounds.damage.preload = "auto";
                sounds.damage.load();
                sounds.damage.play();
                sounds.damage.volume = 0.3;
            }
            this.player.makeSmall(this.player.status);
        }

        if (this.isCollisionFalling()) {
            if (this.player.status === "small") {
                this.life.decreaseHealth(20);
                this.clearHealthIndicator(
                    this.obstaclesFalling,
                    "obstacleFalling"
                );
                sounds.damage.preload = "auto";
                sounds.damage.load();
                sounds.damage.play();
                sounds.damage.volume = 0.3;
            }
            this.player.makeSmall(this.player.status);
        }

        if (this.isCollisionEnemy()) {
            if (this.player.status === "small") {
                this.life.decreaseHealth(1);
                this.clearHealthIndicator(this.enemies, "enemy");
                sounds.damage.preload = "auto";
                sounds.damage.load();
                sounds.damage.play();
                sounds.damage.volume = 0.3;
            }
            this.player.makeSmall(this.player.status);
        }

        if (this.isCollisionAcid()) {
            if (this.player.status === "small") {
                this.life.decreaseHealth(25);
            }
            this.player.makeSmall(this.player.status);
            // sounds.damage.preload = "auto";
            // sounds.damage.load();
            sounds.damage.play();
            sounds.damage.volume = 0.3;
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
            sounds.bonus.play();
            sounds.bonus.volume = 0.3;
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
        this.levelsBanners = [];
        this.acidBullets = [];
        this.healthIndicators = [];

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

        this.obstaclesVel = 180;
        this.obstaclesFallingVel = 180;
        this.enemiesVel = 240;
        this.yearCounter = 0;

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
        this.obstacles.forEach((obs) => obs.draw());
        this.acidBullets.forEach((bullet) => bullet.draw());
        this.enemies.forEach((enemy) => enemy.draw());
        this.obstaclesFalling.forEach((obs) => obs.draw());
        this.powerUps.forEach((powerUp) => powerUp.draw());
        this.player.draw(this.framesCounter);
        this.explodeBubble();
        this.appearHealthIndicator();
        this.pointsBox.draw();
        this.levelsBanners.forEach((banner) => banner.draw());
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
            this.yearCounter >= 2 &&
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
    explodeBubble() {
        this.explosions.forEach((bubble, i) => {
            bubble.explode();
            bubble.timer === 90 ? this.explosions.splice(i, 1) : null;
        });
    },

    appearHealthIndicator() {
        this.healthIndicators.forEach((indicator, i) => {
            indicator.draw();
            indicator.timer === 90 ? this.healthIndicators.splice(i, 1) : null;
        });
    },

    //CLEARING ELEMENTS

    clearExplosion(arr) {
        arr.forEach((arrEl) => {
            if (this.checkCollision(arrEl)) {
                this.explosions.push(
                    new Explosion(this.ctx, arrEl.posX, arrEl.posY)
                );
            }
        });
    },

    clearHealthIndicator(arr, type) {
        arr.forEach((arrEl, i) => {
            if (this.checkCollision(arrEl)) {
                this.healthIndicators.push(
                    new HealthIndicators(
                        this.ctx,
                        type,
                        this.player.posX,
                        this.player.posY
                    )
                );
            }
        });
    },

    clearObstacles() {
        this.clearExplosion(this.obstacles);

        this.obstacles = this.obstacles.filter(
            (obs) => obs.posX + obs.width >= 0 && !this.checkCollision(obs)
        );

        this.clearExplosion(this.obstaclesFalling);

        this.obstaclesFalling = this.obstaclesFalling.filter(
            (obs) => obs.posY <= this.height && !this.checkCollision(obs)
        );
    },

    clearEnemies() {
        this.enemies = this.enemies.filter(
            (enemy) => enemy.posX + enemy.width >= 0
        );
    },

    clearAcid() {
        this.acidBullets = this.acidBullets.filter(
            (acid) => acid.posX + acid.width >= 0
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
        return this.acidBullets.some((acid, i) => {
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

            if (
                player.x < acidBullet.x + acidBullet.width &&
                player.x + player.width > acidBullet.x &&
                player.y < acidBullet.y + acidBullet.height &&
                player.y + player.height > acidBullet.y
            ) {
                this.clearHealthIndicator(this.acidBullets, "acid");
                this.acidBullets.splice(i, 1);
                return true;
            } else {
                return false;
            }
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
                    this.clearExplosion(targetArr);
                    targetArr.splice(i, 1);
                    collision = true;
                }
            }
            if (collision) {
                this.explosions.push(
                    new Explosion(this.ctx, bubble.posX, bubble.posY)
                );
                this.player.bubbles.splice(i, 1);
                sounds.bubbleShot.preload = "auto";
                sounds.bubbleShot.load();
                sounds.bubbleExplode.play();
                sounds.bubbleExplode.volume = 0.4;
            }
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
            clearInterval(this.interval);
            this.highScore(this.pointsBox.points);
            this.life.health = 0;
            this.life.barWidth = 0;
            this.clear();
            this.drawAll();
            this.gameStarted = false;
            this.gameOver.draw();
            sounds.music.pause();
            sounds.music.currentTime = 0;
            sounds.gameOver.play();
            sounds.gameOver.volume = 0.6;
        }
    },
};
