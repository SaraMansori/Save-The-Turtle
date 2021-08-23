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

            //Generates Enemies
            this.generateEnemies();

            //Checks collision and decreases health if isCollision === true
            if (this.isCollision()) {
                this.life.decreaseHealth(10);
                this.player.changeStatus("small");
            }

            //Checks collision and decreases health if isCollision === true for the falling obstacles
            if (this.isCollisionFalling()) {
                this.life.decreaseHealth(20);
                this.playerStatus = "small";
            }

            if (this.isCollisionEnemy()) {
                this.life.decreaseHealth(1);
                this.playerStatus = "small";
            }

            //Checks collision and decreases health if isCollision === true for the falling obstacles

            if (this.life.health <= 0) {
                this.gameEnd();
            }

            //Clears obstacles that have been hit and the ones that are outside the screen
            this.clearObstacles();
            this.clearEnemies();
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(
            this.ctx,
            this.width,
            this.height,
            "./img/background-seamless.jpg"
        );
        this.player = new Player(this.ctx, this.width, this.height, this.keys);
        this.obstacles = [];
        this.obstaclesFalling = [];
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
        this.obstaclesFalling.forEach((obs) => obs.draw());
        this.player.draw(this.framesCounter);
        this.pointsBox.draw();
        this.life.draw();
        this.levels.draw();
    },

    generateObstacles() {
        if (this.framesCounter % 90 === 0) {
            this.obstacles.push(
                new Obstacle(this.ctx, this.width, this.height)
            );

            if (this.pointsBox.points > 15) {
                this.obstaclesFalling.push(
                    new ObstacleFalling(this.ctx, this.width, this.height)
                );
            }
        }
    },

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

    //COLLISIONS

    checkCollision(obs) {
        return (
            this.player.posX < obs.posX + obs.width &&
            this.player.posX + this.player.width > obs.posX &&
            this.player.posY < obs.posY + obs.height &&
            this.player.posY + this.player.height > obs.posY
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
        return this.enemies.some((projectile) => {
            const player = {
                x: this.player.posX,
                y: this.player.posY,
                width: this.player.width,
                height: this.player.height,
            };
            let projectileAcid = {
                x: projectile.posX,
                y: projectile.posY,
                width: projectile.width,
                height: projectile.height,
            };

            return (
                player.x < projectileAcid.x + projectileAcid.width &&
                player.x + player.width > projectileAcid.x &&
                player.y < projectileAcid.y + projectileAcid.height &&
                player.y + player.height > projectileAcid.y
            );
        });
    },

    // isCollisionAcid() {
    //     for (let i = 0; i < this.enemies.length; i++) {
    //         return this.enemies[i].acid.some((projectile) => {
    //             const player = {
    //                 x: this.player.posX,
    //                 y: this.player.posY,
    //                 width: this.player.width,
    //                 height: this.player.height,
    //             };
    //             let projectileAcid = {
    //                 x: projectile.posX,
    //                 y: projectile.posY,
    //                 width: projectile.width,
    //                 height: projectile.height,
    //             };

    //             return (
    //                 player.x < projectileAcid.x + projectileAcid.width &&
    //                 player.x + player.width > projectileAcid.x &&
    //                 player.y < projectileAcid.y + projectileAcid.height &&
    //                 player.y + player.height > projectileAcid.y
    //             );
    //         });
    //     }
    // },

    gameEnd() {
        clearInterval(this.interval);
        this.life.health = 0;
        this.life.barWidth = 0;
        this.clear();
        this.drawAll();
        this.gameOver.draw();
    },
};
