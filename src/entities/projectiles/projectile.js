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
            max: 400,
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

        this.is_done = false;
    }

    draw(ctx){

        if( this.is_done ) return;

        const { x, y } = this.position;

        ctx.beginPath();
        ctx.rect(x, y, this.width, this.height);
        ctx.stroke();

    }

    update(time){

        if( this.is_done ) return;

        let x = this.velocity * time.seconds_passed;
        this.position.x += x;
        this.distance.total += x;

        if( Math.abs(this.distance.total) >= this.distance.max ) {
            this.end = true;
        }
    }

    end(){
        this.is_done = true;
    }

}