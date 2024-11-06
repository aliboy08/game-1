export default class Movement {

    constructor(entity){
        this.entity = entity;

        this.entity.is_moving = false;
        this.entity.is_jumping = false;
        
        this.is_running = false;
        this.toggle_run = false;
    }

    idle(){
        this.entity.state = 'Idle';
    }
    
    move_left(){
        this.entity.is_moving = true;
        this.entity.state = 'Walk';
        this.entity.direction = 'left';
        this.entity.velocity.x = -this.entity.speed.move;

        if( this.entity.is_jumping ) {
            this.entity.state = 'Jump';
        }
    }

    move_right(){
        this.entity.is_moving = true;
        this.entity.state = 'Walk';
        this.entity.direction = 'right';
        this.entity.velocity.x = this.entity.speed.move;

        if( this.entity.is_jumping ) {
            this.entity.state = 'Jump';
        }
    }

    jump(){

        if( this.entity.is_jumping ) return;

        this.entity.is_jumping = true;
        this.entity.state = 'Jump';
        this.entity.velocity.y = - this.entity.jump_force;
        this.entity.is_grounded = false;
    }

    jump_end(){
        
        this.entity.is_jumping = false;
        if( this.entity.is_moving ) {
            this.entity.state = 'Walk';
        }
        else {
            this.entity.state = 'Idle';
        }
    }

    run_start(){
        this.toggle_run = true;
    }

    run_end(){
        this.toggle_run = false;
        if( this.entity.is_moving ) {
            this.entity.state = 'Walk';
        }
    }

    movement_end(){
        this.entity.velocity.x = 0;
        this.entity.state = 'Idle';
        this.entity.is_moving = false;
    }

    stop(){
        this.movement_end();
    }

    check_run(){

        if( this.toggle_run ) {
    
            if( !this.entity.is_moving ) return;
            if( this.is_running ) return;
            this.is_running = true;
            
            this.entity.state = 'Run';
            if( this.entity.direction == 'right' ) {
                this.entity.velocity.x = this.entity.speed.run;
            } else if ( this.entity.direction == 'left' ) {
                this.entity.velocity.x = -this.entity.speed.run;
            }
        }
        else {

            this.toggle_run = false;
            this.is_running = false;

            if( !this.entity.is_moving ) return;
            
            if( this.entity.direction == 'right' ) {
                this.entity.velocity.x = this.entity.speed.move;
            } else if ( this.entity.direction == 'left' ) {
                this.entity.velocity.x = -this.entity.speed.move;
            }
        
        }
    }

    update(time){
        this.check_run();
        this.entity.position.x += this.entity.velocity.x * time.seconds_passed;
        this.check_jump_end();
    }

    check_jump_end(){
        if( !this.entity.is_jumping ) return;
        if( !this.entity.is_grounded ) return;
        this.jump_end();
    }
    
}