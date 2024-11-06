
import { get_collision_direction } from 'lib/functions';

export default class AI_Attack {

    constructor(entity) {
        this.entity = entity;
        this.range = 70;
    }

    update(){
        this.check_range();
    }

    draw(ctx){
        // let { x, y, width, height } = this.get_bounds();
        // ctx.save();
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(x, y, width, height);
        // ctx.restore();
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
        if( !this.entity.current_target ) return;
        const target = this.entity.current_target;
        if( get_collision_direction(this.get_bounds(), target.bounds) ) {
            this.on_range();
        }
    }

    on_range(){
        this.entity.movement.movement_end();
        this.entity.attacks.attack();
    }

}