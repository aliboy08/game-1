import { get_bounds } from '../../lib/functions';

export default class Platform {

    constructor(options){

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }
        this.width = options.width ?? 100;
        this.height = options.height ?? 5;
        this.bounds = get_bounds(this);
    }

    update(){
        
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();
    }
    
}