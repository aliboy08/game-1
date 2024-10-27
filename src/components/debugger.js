export default class Debugger {

    constructor(entity){
        this.entity = entity;
    }

    draw(ctx){

        if( this.entity.is_colliding ) {
            console.log('colliding', this)
            ctx.save()
            ctx.strokeStyle = "red";
        }

        ctx.beginPath();
        this.draw_bounds(ctx)
        ctx.stroke();

        if( this.entity.is_colliding ) {
            ctx.restore()
        }
    }

    draw_bounds(ctx){
        ctx.rect(this.entity.bounds.left, this.entity.bounds.top, this.entity.width, this.entity.height);
    }
    
}