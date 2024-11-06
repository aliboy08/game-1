export default class Movement {

    constructor(entity){
        this.entity = entity;
        this.entity.is_moving = false;
        this.is_running = false;
    }
    
    move_left(){
        this.entity.is_moving = true;
        this.entity.direction = 'left';
        this.entity.state = this.is_running ? 'Run' : 'Walk';    
        this.entity.velocity.x = -this.entity.speed[this.is_running ? 'run' : 'move'];
    }

    move_right(){
        this.entity.is_moving = true;
        this.entity.direction = 'right';
        this.entity.state = this.is_running ? 'Run' : 'Walk';
        this.entity.velocity.x = this.entity.speed[this.is_running ? 'run' : 'move'];
    }

    run_start(){
        this.is_running = true;
    }

    run_end(){
        this.is_running = false;
    }

    movement_end(){
        this.entity.velocity.x = 0;
        this.entity.state = 'Idle';
        this.entity.is_moving = false;
    }

    stop(){
        this.movement_end();
    }

    update(time){
        this.entity.position.x += this.entity.velocity.x * time.seconds_passed;
    }
}