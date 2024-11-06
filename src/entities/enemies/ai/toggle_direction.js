export class AI_Toggle_Direction {

    constructor(entity){
        this.entity = entity;
        this.last_x = null;
        this.distance = null;
        this.threshold = 5; // min distance to switch direction
        this.pause = false;
        this.pause_duration = 1000;
    }

    update(){
        this.check_toggle();
    }
    
    check_toggle(){

        if( this.last_x === null ) {
            this.last_x = this.entity.position.x;
        }

        if( this.pause ) return;
        if( this.distance === null ) return;

        if( this.distance <  this.threshold ) {

            if( this.entity.direction === 'right' ) {
                this.entity.movement.move_left();
            } else {
                this.entity.movement.move_right();
            }

            this.pause = true;
            setTimeout(()=>{
                this.pause = false;
            },  this.pause_duration );
        }
    }

    check_distance(){
        // check distance travelled every 1sec
        setInterval(()=>{
            this.distance = Math.abs(Math.abs(this.entity.position.x) - Math.abs(this.last_x));
            this.last_x = null;
        }, 1000);
    }

}