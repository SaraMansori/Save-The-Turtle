const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,

    background: undefined,
    player: undefined,
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
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    start() {
        this.reset();

        this.interval = setInterval(() => {
            this.framesCounter > 5000
                ? (this.framesCounter = 0)
                : this.framesCounter++;

            this.clear();
            this.drawAll();

            this.generateObstacles();
            this.clearObstacles();

            // this.isCollision() ? this.gameOver() : null
        }, 1000 / this.FPS);
    },

    reset() {
        this.background = new Background(
            this.ctx,
            this.width,
            this.height,
            "./img/bg.png"
        );

        this.player = new Player(this.ctx, this.width, this.height, this.keys);
        this.obstacles = [];
        this.obstaclesFalling = [];
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawAll() {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.obstacles.forEach((obs) => obs.draw());
        this.obstaclesFalling.forEach((obs) => obs.draw());
    },

    generateObstacles() {
        if (this.framesCounter % 90 === 0) {
            this.obstacles.push(
                new Obstacle(this.ctx, this.width, this.height)
            );
            this.obstaclesFalling.push(
                new ObstacleFalling(this.ctx, this.width, this.height)
            );
        }
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(
            (obs) => obs.posX + obs.width >= 0
        );
        this.obstaclesFalling = this.obstaclesFalling.filter(
            (obs) => obs.posY <= this.height
        );
    },
};
