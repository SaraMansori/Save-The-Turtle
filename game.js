const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    barsPosY: 0,
    FPS: 60,
    framesCounter: 0,
    pointsCounter: 0,
    points: 0,
    background: undefined,
    player: undefined,
    pointsBox: undefined,
    levels: undefined,
    yearCounter: 0,
    year: 2021,
    obstacles: [],
    obstaclesFalling: [],
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
            this.framesCounter > 5000
                ? (this.framesCounter = 0)
                : this.framesCounter++;

            this.pointsCounter > 60
                ? (this.pointsCounter = 0)
                : this.pointsCounter++;

            this.pointsCounter > 60
                ? this.pointsBox.points++
                : (this.pointsBox.points = this.pointsBox.points);

            this.yearCounter > 900
                ? (this.yearCounter = 0)
                : this.yearCounter++;

            this.yearCounter > 900
                ? this.levels.year++
                : (this.levels.year = this.levels.year);


            this.clear();
            this.drawAll();

            this.generateObstacles();

            if (this.isCollision()) {
                this.life.decreaseHealth();
            }

            this.clearObstacles();



            //this.updateLevels();

            // this.isCollision() ? this.gameOver() : null
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(
            this.ctx,
            this.width,
            this.height,
            "https://opengameart.org/sites/default/files/Preview_143.png"
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
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll() {
        this.background.draw();
        this.obstacles.forEach((obs) => obs.draw());
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

    clearObstacles() {
        this.obstacles = this.obstacles.filter(
            (obs) =>
                obs.posX + obs.width >= 0 && !this.checkCollision(obs)
        );
        this.obstaclesFalling = this.obstaclesFalling.filter(
            (obs) => obs.posY <= this.height
        );

    },

    // updateLevels() {
    //     if (this.framesCounter % 90 === 0) {
    //         if (this.pointsBox.points > 15) {
    //             this.levels.year++;
    //         }
    //     }
    // },

    checkCollision(obs) {
        return (this.player.posX < obs.posX + obs.width &&
            this.player.posX + this.player.width > obs.posX &&
            this.player.posY < obs.posY + obs.height &&
            this.player.posY + this.player.height > obs.posY)
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

        // return this.obstacles.some((obs) => {
        //     return (
        //         this.player.posX + this.player.width === obs.posX ||
        //         this.player.posX === obs.posX + obs.width
        //     );
        // });
        // floatingObstaclesCollision || fallingObstaclesCollision ? true : false;
    },
};
