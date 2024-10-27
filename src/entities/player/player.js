import Movement from './movement';
import Attacks from './attacks';
import Controls from './controls';
import Player_Debug from './debug';
import sprites_loader from '../../sprites/loader';

export default class Player {

    constructor(options){

        this.model = options.model ?? 'Samurai';
        
        this.state = 'Idle';
        this.direction = 'right';

        this.width = options.width ?? 26;
        this.height = options.height ?? 74;

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }

        this.hitbox = {
            width: 26,
            height: 74,
            x: 50,
            y: 50,
        };

        this.speed = {
            move: 200,
            run: 400,
        };
        
        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.sprite_offset = {
            x: 50,
            y: 50
        }

        this.bounds = {
            top: this.position.y,
            right: this.position.x + this.width,
            bottom: this.position.y + this.height,
            left: this.position.x,
        }
        
        this.jump_force = 550;
        this.animation_timer = 0
        
        this.debug = new Player_Debug(this);

        this.movement = new Movement(this);
        this.controls = new Controls(this);
        this.attacks = new Attacks(this);

        this.sprites = sprites_loader(this.model);

        this.action = null;
        this.action_complete = true;
    }
    
    update(time){

        this.bounds = {
            top: this.position.y,
            right: this.position.x + this.width,
            bottom: this.position.y + this.height,
            left: this.position.x,
        }
        
        // this.gravity.update(time);
        this.movement.update(time);
        this.update_sprite(time);
        this.debug.update();
    }

    draw(ctx){

        if( !this.sprites.ready ) return;

        const sprite = this.get_sprite();
        
        const w = this.sprites.frame_width;
        const h = this.sprites.frame_height;
        const sx = w * sprite.index;
        const sy = 0;

        const x = this.position.x - this.sprite_offset.x;
        const y = this.position.y - this.sprite_offset.y;

        if( this.direction == 'left' ) {
            // flip: direction - left
            ctx.save()
            ctx.scale(-1, 1)
            ctx.drawImage(sprite.img, sx, sy, w, h, -x-w, y, w, h)
            ctx.restore()
        }
        else {
            // default: direction - right
            ctx.drawImage(sprite.img, sx, sy, w, h, x, y, w, h); 
        }

        this.debug.draw(ctx);
    }

    update_sprite(time){

        const sprite_action = this.get_sprite();
        
        if( time.previous > this.animation_timer + sprite_action.animation_time ) {

            this.animation_timer = time.previous;

            // cycle through frames
            sprite_action.index++;
            if( sprite_action.index == sprite_action.frames_count) {
                sprite_action.index = 0;
                this.action = null;
            }
        }
    }

    get_sprite(){
        const key = this.action ? this.action : this.state;
        return this.sprites[key];
    }

}