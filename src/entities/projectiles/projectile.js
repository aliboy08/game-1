import { get_bounds } from 'lib/functions';

export default class Projectile {
    
    constructor(options){
        
        this.width = options.width ?? 20;
        this.height = options.height ?? 20;
        
        this.velocity = options.velocity ?? 100;
        this.direction = options.direction ?? 'right';

        if( this.direction == 'left' ) {
            this.velocity = -this.velocity;
        }

        this.distance = {
            max: 1000,
            total: 0,
        }

        this.position_initial = {
            x: options.position.x,
            y: options.position.y,
        }

        this.position = {
            x: options.position.x,
            y: options.position.y,
        }

        this.bounds = get_bounds(this);

        // this.image = options.image ?? null;

        this.sprite = options.sprite ?? null;

        this.is_done = false;
    }

    draw(ctx){

        if( this.is_done ) return;

        if( this.sprite ) this.sprite.draw(ctx, this);

        // const { x, y } = this.position;
        // ctx.strokeRect(x, y, this.width, this.height);
    }

    update(time){
        
        if( this.is_done ) return;

        if( this.sprite ) this.sprite.update(time, this);

        this.bounds = get_bounds(this);

        let x = this.velocity * time.seconds_passed;
        this.position.x += x;
        this.distance.total += x;

        if( Math.abs(this.distance.total) >= this.distance.max ) {
            this.end();
        }
    }

    end(){
        this.is_done = true;
    }

}