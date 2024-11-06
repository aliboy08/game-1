export default class FPS_Counter {

    constructor(){
        this.fps = 0;
    }

    update(time){
        this.fps = Math.trunc(1/time.seconds_passed);
    }

    draw(ctx){
        ctx.font = "bold 20px Arial"
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`FPS: ${this.fps}`, ctx.canvas.width / 2, 30);
    }
}