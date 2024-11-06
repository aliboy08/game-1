export default class Projectile_Sprite {

    constructor(options){
        
        this.frames_count = options.sprite.frames_count;
        this.images = options.sprite.images;

        this.width = options.sprite.max.width;
        this.height = options.sprite.max.height;
        
        this.scale = options.scale ?? 1;
        
        this.animation_time = options.animation_time ?? 60;
        this.animation_timer = 0;

        this.position = {
            x: 0,
            y: 0,
        }

        this.image_index = 0;
    }
    
    update(time, projectile){

        this.position = projectile.position;

        if( time.previous < this.animation_timer + this.animation_time ) return;
        this.animation_timer = time.previous;

        this.image_index++;
        if( this.image_index == this.images.length ) {
            this.image_index = 0;
        }
    }
    
    draw(ctx, projectile){

        const image = this.images[this.image_index];

        const sx = - (this.width - image.width); // right
        const sy = - (this.height - image.height) / 2; // middle

        const dx = this.width;
        const dy = this.height;

        // console.log({
        //     w: this.width,
        //     h: this.height,
        //     pw: projectile.width,
        //     ph: projectile.height,
        // })
        
        const { x, y } = this.position;
        
        const image_width = this.width * this.scale;
        const image_height = this.height * this.scale;

        // ctx.save();
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(x, y, image_width, image_height);
        // ctx.restore();
        
        if( projectile.direction == 'left' ) {
            ctx.save()
            ctx.scale(-1, 1)
            ctx.drawImage(image, sx, sy, dx, dy, -x-image_width, y, image_width, image_height)
            ctx.restore()
        } else {
            ctx.drawImage(image, sx, sy, dx, dy, x, y, image_width, image_height);
        }
        
    }
    
}
    