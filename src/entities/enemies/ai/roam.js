import { get_random_item } from 'lib/functions';
import { AI_Toggle_Direction } from './toggle_direction';

const directions = ['left', 'right'];

export default class AI_Roam {
    
    constructor(entity){
        this.entity = entity;        
        this.start_x = 0;
        this.distance = 0;
        this.range = 200;

        this.pause_duration = 2000;

        this.state = null;

        this.toggle_direction = new AI_Toggle_Direction(entity);
        this.toggle_direction.check_distance();
        
        this.start_delay = 1000;
        this.start_timeout = null;

        this.start();
    }

    update(){
        if( this.state == 'start' ) {
            this.check_distance();
            this.toggle_direction.update();
        }
    }
    
    start(){
        
        clearTimeout(this.start_timeout);
        

        this.start_timeout = setTimeout(()=>{
            this.state = 'start';
            
            this.entity.movement.run_end();

            const direction = get_random_item(directions);
            // console.log('roam_start', direction)
    
            if( direction === 'right' ) {
                this.entity.movement.move_right();
            } else {
                this.entity.movement.move_left();
            }
        }, this.start_delay );
    }
    
    pause(){
        this.stop();
        this.state = 'pause';
        setTimeout(()=>{
            this.start();
        }, this.pause_duration);
    }

    stop(){
        this.state = 'stop';
        this.entity.movement.movement_end();
        this.distance = 0;
        this.start_x = this.entity.position.x;
    }
    
    check_distance(){
        this.distance = Math.abs(this.start_x - this.entity.position.x);
        if( this.distance >= this.range ) {
            this.pause();
        }  
    }

}