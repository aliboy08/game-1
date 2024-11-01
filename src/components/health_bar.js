export default class Health_Bar {

    constructor(entity){
        this.entity = entity;

        this.width = 30;
        this.height = 3;

        this.position = {
            x: 0,
            y: 0,
        }

        this.health = {
            max: entity.health,
        }
        this.percent = this.entity.health/this.health.max;
    }
    
    draw(ctx){

        if( this.entity.is_dead ) return;   

        ctx.save()
        ctx.strokeStyle = "maroon";
        ctx.fillStyle = "maroon";
        ctx.lineWidth = 1;

        // frame
        ctx.beginPath();

        ctx.rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        ctx.stroke();

        // fill
        ctx.beginPath();

        ctx.rect(
            this.position.x,
            this.position.y,
            this.width * this.health.percent,
            this.height
        );
        
        ctx.fill();

        ctx.restore()
    }

    update(){
        this.health.percent = this.entity.health/this.health.max;

        this.position = {
            // x: this.entity.position.x,
            x: this.entity.position.x + (this.entity.width/2) - (this.width/2), // center
            y: this.entity.position.y - 10,
        }
    }
    
}