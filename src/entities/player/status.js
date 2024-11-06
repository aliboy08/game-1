export default class Player_Status {

    constructor(entity){

        this.entity = entity;
        
        this.position = {
            x: 10,
            y: 10,
        }

        this.init();
    }

    init(){
        this.init_portrait();
        this.init_health();
        this.init_mana();
    }

    draw(ctx){
        this.portrait.draw(ctx);
        this.health.draw(ctx);
        this.mana.draw(ctx);
    }

    update(){}
    
    init_portrait(){

        const radius = 16;
        const padding = 5;
        let x = this.position.x + radius/2 + padding;
        let y = this.position.y + radius/2 + padding;

        const diameter = radius * 2;
        
        this.portrait = { radius, diameter, x, y }

        this.portrait.draw = (ctx) =>{

            ctx.save();
            ctx.beginPath();
            ctx.arc( x, y, radius, 0, Math.PI * 2, true );
            ctx.fillStyle = 'orange';
            ctx.fill();
            ctx.restore();

            // let text_x = x - radius;
            // let text_y = y - radius;
            ctx.save();
            ctx.font = 'bold 15px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';
            ctx.fillText(this.entity.id, x, y);
            ctx.restore();
            // ctx.strokeRect(text_x, text_y, diameter, diameter);
        }
    }

    init_health(){

        const padding = 8;
        const height = 6;
        const width = 200;
        const x = this.portrait.x + this.portrait.radius + padding;
        const y = this.portrait.y - this.portrait.radius/2;
        const color = '#F95454';

        this.health = {
            x, y, width, height,
        }
        
        this.health.draw = (ctx) => {
            this.draw_bar( ctx, color, x, y, width, height, this.entity.health.percent);
        }
    }

    init_mana(){

        const padding = 5;
        const height = 6;
        const width = 200;
        const x = this.health.x;
        const y = this.health.y + this.health.height + padding;
        const color = '#77CDFF';
        
        this.mana = {
            x, y, width, height,
        }
        
        this.mana.draw = (ctx) => {
            this.draw_bar( ctx, color, x, y, width, height, this.entity.mana.percent);
        }

    }

    draw_bar(ctx, color, x, y, w, h, percent){
        ctx.save()
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.strokeRect( x, y, w, h );
        ctx.fillRect( x, y, w * percent, h );
        ctx.restore();
    }

}