import { get_bounds } from 'lib/functions';

const img = new Image();
img.src = 'src/sprites/environment/nature/PNG/tiles/tile105.png';
img.width = 48;
img.height = 48;

const y_offset = 35;

export default class Platform {

    constructor(options){

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }
        this.width = options.width ?? 96;
        this.height = options.height ?? 10;
        this.bounds = get_bounds(this);
        
        // this.cols = this.width / img.width;
        // this.repeat_x = Math.round(this.width / img.width);
        this.repeat_x = Math.round(this.width / img.width);    
    }

    update(){}

    draw(ctx){
        
        // ctx.beginPath();
        // ctx.rect(this.position.x, this.position.y, this.width, this.height);
        // ctx.stroke();
        
        for( let i = 0; i < this.repeat_x; i++ ) {
            ctx.drawImage(
                img,
                this.position.x + (img.width * i),
                this.position.y - y_offset,
            );
        }

    }
    
}