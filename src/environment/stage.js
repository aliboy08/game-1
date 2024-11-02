import Floor from './floor';
import Platform from 'entities/platform/platform';
import { apply_gravity } from 'components/gravity';

export default class Stage {
    
    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;

        this.entities = [];
        this.floor = new Floor(this);
        this.init_platforms();
    }

    update(time, ctx){
        
        apply_gravity(this.entities, time);

        // platforms collision
        this.platforms.forEach(platform=>{
            platform.collision(this.entities);
        });
        
        // floor collision
        this.floor.collision(this.entities);
        
        // edge: left & right
        this.apply_bounds();

        this.entities.forEach(entity=>{
            entity.update(time, ctx);
        });
    }

    draw(ctx){

        this.floor.draw(ctx);

        this.platforms.forEach(platform=>{
            platform.draw(ctx);
        })

        this.entities.forEach(entity=>{
            entity.draw(ctx);
        });
        
    }

    init_platforms(){

        this.platforms = [

            new Platform({ x: 0, y: 100 }),
            new Platform({ x: 400, y: 100 }),
            new Platform({ x: 800, y: 100 }),

            new Platform({ x: 200, y: 200 }),
            new Platform({ x: 500, y: 200 }),
            new Platform({ x: 900, y: 200 }),

            new Platform({ x: 100, y: 300 }),
            new Platform({ x: 300, y: 300 }),
            new Platform({ x: 650, y: 300 }),

            new Platform({ x: 0, y: 400 }),
            new Platform({ x: 450, y: 400 }),
            new Platform({ x: 750, y: 400 }),
        ];
    }

    apply_bounds(){
        for( const entity of this.entities ) {
            if( entity.direction == 'left' ) {
                if( entity.bounds.left <= 0 ) {
                    entity.position.x = 0;
                }
            }
            else if ( entity.direction == 'right' ) {
                if( entity.bounds.right >= this.width ) {
                    entity.position.x = this.width - entity.width;
                }
            }
        }
    }
    
}