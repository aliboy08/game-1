export default class Debugger {

    constructor(entity){
        this.entity = entity;
    }

    draw(ctx){

        if( this.entity.state == 'Dead' ) {
            return;
        }

        if( this.entity.is_colliding ) {
            ctx.save()
            ctx.strokeStyle = "yellow";
        }

        if( this.entity.is_hit ) {
            ctx.save()
            ctx.strokeStyle = "red";
        }

        this.draw_bounds(ctx)
        this.draw_attack(ctx);
        
        if( this.entity.is_colliding ) {
            ctx.restore()
        }

        if( this.entity.is_hit ) {
            ctx.restore()
        }
    }

    draw_bounds(ctx){

        const { width, height } = this.entity;
        const { x, y } = this.entity.position;
        
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    draw_attack(ctx){
        
        if( !this.entity.attacks ) return;
        if( !this.entity.attacks.action ) return;

        const { width, height } = this.entity.attacks.action;
        const { x, y } = this.entity.attacks.action.position;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }
    
}