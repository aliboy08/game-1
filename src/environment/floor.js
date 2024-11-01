const floor_height = 48;

const img = new Image();
img.src = 'src/sprites/environment/nature/PNG/tiles/tile45.png';
img.width = 48;
img.height = 48;

export default class Floor {

    constructor(ctx){

        this.width = ctx.canvas.width;
        this.height = floor_height;

        this.position = {
            x: 0,
            y: ctx.canvas.height - this.height,
        }

        // this.cols = this.width / img.width;
        this.repeat_x = Math.round(this.width / img.width);
    }

    draw(ctx){
        
        // repeat tiles
        for( let i = 0; i < this.repeat_x; i++ ) {
            ctx.drawImage(
                img,
                this.position.x + (img.width * i),
                this.position.y,
            );
        }
    }

}