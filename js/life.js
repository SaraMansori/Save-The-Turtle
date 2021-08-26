class Life {
    constructor(ctx, gameWidth, gameHeight, barsPosY) {
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.barWidth = 400;
        this.barMaxWidth = 400;
        this.barHeight = 25;
        this.posX = this.gameWidth / 2 - this.barWidth / 2;
        this.posY = barsPosY - this.barHeight;
        this.textX = this.gameWidth / 2;
        this.color = "#66CC66";
        this.health = 100;
        this.maxHealth = 100;
    }

    colorHealth() {
        let percent = (this.health / this.maxHealth) * 100;
        if (percent <= 70) {
            //yellows
            this.color = "#d6ed20";
        }
        if (percent <= 50) {
            //orange
            this.color = "#ffbe3d";
        }
        if (percent <= 25) {
            //reds
            this.color = "#ff3d3d";
        }
        if (percent > 70) {
            //green
            this.color = "#66CC66";
        }
    }

    draw() {
        this.colorHealth();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.posX,
            this.posY - 6,
            this.barWidth,
            this.barHeight + 12
        );
        this.ctx.font = "20px 'Press Start 2P'";
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(
            this.posX,
            this.posY - 6,
            this.barMaxWidth,
            this.barHeight + 12
        );
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "HEALTH: " + this.health + "%",
            this.textX,
            this.posY + this.barHeight
        );
    }

    decreaseHealth(damage) {
        this.health -= damage;
        this.barWidth = (this.health / this.maxHealth) * this.barMaxWidth;
    }

    increaseHealth(health) {
        if (this.health + health > 100) {
            this.health = 100;
        } else {
            this.health += health;
        }
        this.barWidth = (this.health / this.maxHealth) * this.barMaxWidth;
    }
}
