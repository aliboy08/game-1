import { stand_over } from 'lib/functions';

const floor_height = 48;

const img = new Image();
img.src = 'src/sprites/environment/nature/PNG/tiles/tile45.png';
img.width = 48;
img.height = 48;

export default class Floor {

    constructor(stage){

        this.width = stage.width;
        this.height = floor_height;

        this.position = {
            x: 0,
            y: stage.height - this.height,
        }
        
        this.image_repeat_x = Math.round(this.width / img.width);
    }

    // update(entities){
    //     this.collision(entities);
    // }

    draw(ctx){

        for( let i = 0; i < this.image_repeat_x; i++ ) {
            ctx.drawImage(
                img,
                this.position.x + (img.width * i),
                this.position.y,
            );
        }
    }

    collision(entities){
        entities.forEach(entity=>{
            if( entity.velocity.y < 0 ) return; // jumping
            if( entity.bounds.bottom >= this.position.y ) {
                stand_over(entity, this);
            }
        })
    }
    
}