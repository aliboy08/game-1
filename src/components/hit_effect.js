export default class Hit_Effect {
    
    constructor(options){
        
        this.frames_count = options.sprite.frames_count;
        this.images = options.sprite.images;

        this.width = options.sprite.max.width;
        this.height = options.sprite.max.height;

        this.scale = options.scale ?? 1;

        this.animation_time = options.animation_time ?? 60;
        this.animation_timer = 0;

        this.image_index = 0;
        this.animating = false;

        this.direction = false;
        this.target = null;

        this.offset = options.offset ?? {
            y: 10,
            x: {
                left: 0,
                right: -60,
            }
        };

    }

    update(time){

        if( !this.target ) return;
        
        if( time.previous < this.animation_timer + this.animation_time ) return;

        this.animation_timer = time.previous;
        
        this.image_index++;
        if( this.image_index == this.images.length ) {
            this.image_index = 0;
            this.on_complete();
        }
    }

    draw(ctx){
        
        if( !this.target ) return;

        const image = this.images[this.image_index];

        const sx = - (this.width - image.width); // right
        const sy = - (this.height - image.height) / 2; // middle

        const dx = this.width;
        const dy = this.height;
        
        let { x, y } = this.target.position;
        
        // y -= this.target.height/2;
        if( this.direction == 'left' ) {
            x -= this.target.width/2;
        }
        else {
            x += this.target.width/2;
        }

        y += this.offset.y;
        x += this.offset.x[this.direction];
        
        const image_width = this.width * this.scale;
        const image_height = this.height * this.scale;

        // ctx.save();
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(x, y, image_width, image_height);
        // ctx.restore();
        
        if( this.direction == 'left' ) {
            ctx.save()
            ctx.scale(-1, 1)
            ctx.drawImage(image, sx, sy, dx, dy, -x-image_width, y, image_width, image_height)
            ctx.restore()
        } else {
            ctx.drawImage(image, sx, sy, dx, dy, x, y, image_width, image_height);
        }
    }

    animate(target, direction){
        this.target = target;
        this.direction = direction;
    }
    
    on_complete(){
        this.target = null;
    }
}