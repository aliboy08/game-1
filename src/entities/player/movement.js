export default class Movement {

    constructor(player){
        this.player = player;

        this.player.is_moving = false;
        this.player.is_jumping = false;

        this.is_running = false;
        this.toggle_run = false;
    }

    idle(){
        this.player.state = 'Idle';
    }
    
    backward(){
        this.player.is_moving = true;
        this.player.state = 'Walk';
        this.player.direction = 'left';
        this.player.velocity.x = -this.player.speed.move;

        if( this.player.is_jumping ) {
            this.player.state = 'Jump';
        }
    }

    forward(){
        this.player.is_moving = true;
        this.player.state = 'Walk';
        this.player.direction = 'right';
        this.player.velocity.x = this.player.speed.move;

        if( this.player.is_jumping ) {
            this.player.state = 'Jump';
        }
    }

    crouch(){
        // to do... 
    }

    jump(){
        if( this.player.is_jumping ) return;
        this.player.is_jumping = true;
        this.player.state = 'Jump';
        this.player.velocity.y = - this.player.jump_force;
        this.player.is_grounded = false;
    }

    jump_end(){
        
        this.player.is_jumping = false;
        if( this.player.is_moving ) {
            this.player.state = 'Walk';
        }
        else {
            this.player.state = 'Idle';
        }
    }

    run_start(){
        this.toggle_run = true;
    }

    run_end(){
        this.toggle_run = false;
    }

    movement_end(){
        this.player.velocity.x = 0;
        this.player.state = 'Idle';
        this.player.is_moving = false;
    }

    stop(){
        this.movement_end();
    }

    check_run(){

        if( this.toggle_run ) {
    
            if( !this.player.is_moving ) return;
            if( this.is_running ) return;
            this.is_running = true;
            
            this.player.state = 'Run';
            if( this.player.direction == 'right' ) {
                this.player.velocity.x = this.player.speed.run;
            } else if ( this.player.direction == 'left' ) {
                this.player.velocity.x = -this.player.speed.run;
            }
        }
        else {

            this.toggle_run = false;
            this.is_running = false;

            if( !this.player.is_moving ) return;
            
            if( this.player.direction == 'right' ) {
                this.player.velocity.x = this.player.speed.move;
            } else if ( this.player.direction == 'left' ) {
                this.player.velocity.x = -this.player.speed.move;
            }
        
        }
    }

    update(time){
        this.check_run();
        this.player.position.x += this.player.velocity.x * time.seconds_passed;
        this.check_jump_end();
    }

    check_jump_end(){
        if( !this.player.is_jumping ) return;
        if( !this.player.is_grounded ) return;
        this.jump_end();
    }
    
}