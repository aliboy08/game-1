export default class Player_Debug {

    constructor(player){
      
        this.player = player;

        this.width = player.hitbox.width;
        this.height = player.hitbox.height;

        this.hitbox = {
            x: player.position.x + player.hitbox.x,
            y: player.position.y + player.hitbox.y,
            w: player.hitbox.width,
            h: player.hitbox.height,
        }

        this.bounds = {
            x: this.player.bounds.left,
            y: this.player.bounds.top,
            w: this.player.bounds.right - this.player.bounds.left,
            h: this.player.bounds.bottom - this.player.bounds.top,
        }
    }

    update(){

        this.bounds = {
            x: this.player.bounds.left,
            y: this.player.bounds.top,
            w: this.player.bounds.right - this.player.bounds.left,
            h: this.player.bounds.bottom - this.player.bounds.top,
        }
    }

    draw(ctx){
        ctx.beginPath();
        this.draw_bounds(ctx)
        ctx.stroke();
    }

    draw_bounds(ctx){
        // ctx.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        
        ctx.rect(this.player.position.x, this.player.position.y, this.player.width, this.player.height);
    }
    
}