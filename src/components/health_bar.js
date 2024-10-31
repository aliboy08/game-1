export default class Health_Bar {

    constructor(entity){
        this.entity = entity;

        this.frame = {
            width: 40,
            height: 5,
        }

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

        ctx.save()
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.lineWidth = 1;

        // frame
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.frame.width, this.frame.height);
        ctx.stroke();

        // fill
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.frame.width * this.health.percent, this.frame.height);
        ctx.fill();

        ctx.restore()
    }

    update(){

        // this.health_percentage = (this.health_max - this.entity.health) / this.health_max;
        this.health.percent = this.entity.health/this.health.max;

        this.position = {
            x: this.entity.position.x,
            y: this.entity.position.y - 10,
        }
    }
    
}