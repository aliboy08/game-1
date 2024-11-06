export default class Health_Bar {

    constructor(entity){
        this.entity = entity;

        this.width = 30;
        this.height = 3;

        this.position = {
            x: 0,
            y: 0,
        }
    }
    
    draw(ctx){

        if( this.entity.is_dead ) return;   

        ctx.save()

        ctx.strokeStyle = "maroon";
        ctx.fillStyle = "maroon";

        // outline
        ctx.strokeRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        // fill
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width * this.entity.health.percent,
            this.height
        );

        ctx.restore()
    }

    update(){
        this.position = {
            // x: this.entity.position.x,
            x: this.entity.position.x + (this.entity.width/2) - (this.width/2), // center
            y: this.entity.position.y - 10,
        }
    }
    
}