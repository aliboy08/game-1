import { get_bounds, stand_over } from 'lib/functions';

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

        const img = new Image();
        img.src = 'sprites/environment/tile105.png';
        img.width = 48;
        img.height = 48;
        this.img = img;

        this.repeat_x = Math.round(this.width / this.img.width);
    }

    draw(ctx){
        
        for( let i = 0; i < this.repeat_x; i++ ) {
            ctx.drawImage(
                this.img,
                this.position.x + (this.img.width * i),
                this.position.y - y_offset,
            );
        }
        
        // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }

    collision(entities){
        
        entities.forEach(entity=>{
    
            const is_falling = entity.velocity.y > 0;
            if( !is_falling ) return;
            
            if( entity.bounds.right < this.bounds.left ) return;
            if( entity.bounds.left > this.bounds.right ) return;
            if( entity.bounds.bottom > this.bounds.top ) return;
        
            if( entity.position.y >= this.position.y - entity.height ) {
                stand_over(entity, this)
            }
            
        })
        
    }
    
}