import { get_collision_direction } from 'lib/functions';

export default class AI_Target {

    constructor(entity){
        this.entity = entity;
        this.range = 360;
        this.current_target = null;
    }

    update(){
        this.check_range();
    }

    draw(ctx){
        // let { x, y, width, height } = this.get_bounds();
        // ctx.strokeRect(x, y, width, height);
    }
    
    get_bounds(){
        let { x, y } = this.entity.position;
        const width = this.range;
        x = x - width/2 + this.entity.width/2;
        const height = this.entity.height;
        const top = y;
        const right = x + width;
        const bottom = y + height;
        const left = x;
        return { top, right, bottom, left, x, y, width, height }
    }

    check_range(){

        const bounds = this.get_bounds();
        
        let target_found = false;

        this.entity.targets.forEach(target=>{

            if( target.is_dead ) return;

            if( target_found ) return;

            const direction = get_collision_direction(bounds, target.bounds);
            
            if( !direction ) {
                this.unset_target();
                return;
            }
            
            this.set_target(target);
            this.chase_target(direction);

            target_found = direction;
        })
    }

    set_target(target){
        if( this.current_target ) return;
        this.current_target = target;
        this.entity.current_target = target;
        if( typeof this.on_target_set === 'function' ) {
            this.on_target_set();
        }
    }

    unset_target(){
        if( !this.current_target ) return;
        this.current_target = null;
        this.entity.current_target = null;
        if( typeof this.on_target_unset === 'function' ) {
            this.on_target_unset();
        }
        this.stop_chase();
    }
    
    chase_target(direction){
        
        if( this.entity.pause.state ) {
            return;
        }

        if( !this.current_target ) return;
        
        this.entity.direction = direction;

        if( direction === 'left' ) {
            this.entity.movement.move_left();
        }
        else if ( direction === 'right' ) {
            this.entity.movement.move_right();
        }

        this.entity.movement.run_start();
    }

    stop_chase(){
        this.entity.movement.movement_end();
    }
    
}