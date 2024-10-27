export default class Debugger {

    constructor(entity){
        this.entity = entity;
        this.update_bounds();
    }

    update(){
        this.update_bounds();
    }

    draw(ctx){
        ctx.beginPath();
        this.draw_bounds(ctx)
        ctx.stroke();
    }

    draw_bounds(ctx){
        ctx.rect(this.entity.position.x, this.entity.position.y, this.entity.width, this.entity.height);
    }

    update_bounds(){
        this.bounds = {
            x: this.entity.bounds.left,
            y: this.entity.bounds.top,
            w: this.entity.bounds.right - this.entity.bounds.left,
            h: this.entity.bounds.bottom - this.entity.bounds.top,
        } 
    }
    
}