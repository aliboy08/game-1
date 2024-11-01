const floor_height = 48;


const tile = {
    img: new Image(),
    width: 48,
    height: 48,
}
tile.img.src = 'src/sprites/environment/nature/PNG/tiles/tile45.png';

export default class Floor {

    constructor(ctx){

        this.width = ctx.canvas.width;
        this.height = floor_height;

        this.position = {
            x: 0,
            y: ctx.canvas.height - this.height,
        }

        this.cols = this.width / tile.width;
        
    }

    draw(ctx){
        
        // repeat tiles
        for( let i = 0; i < this.cols; i++ ) {
            let x = tile.width * i;
            ctx.drawImage(
                tile.img,
                x,
                this.position.y,
            );
        }
    }

}