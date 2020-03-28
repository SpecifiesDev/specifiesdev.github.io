

export class Player {
    constructor(color, ctx, canvas) {
        this.colorState = color;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    create() {
        return {
            color: this.colorState,
            x: (this.canvas.width - 50) / 2,
            y: this.canvas.height / 2,
            draw: () => {
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
                this.ctx.fillStyle = this.color;
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}