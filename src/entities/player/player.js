import Movement from './movement';
import Attacks from './attacks';
import Controls from './controls';
import sprites_loader from '../../sprites/loader';
import Debugger from '../../components/debugger';

export default class Player {

    constructor(options){

        this.model = options.model ?? 'Samurai';
        this.state = 'Idle';
        this.direction = options.direction ?? 'right';

        this.width = options.width ?? 26;
        this.height = options.height ?? 74;

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }

        this.update_bounds();

        this.speed = {
            move: 200,
            run: 400,
        };
        
        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.jump_force = 550;
        
        this.animation_timer = 0;
        this.sprites = sprites_loader(this.model, 'player');
        this.sprites_offset = this.sprites.offset ?? {
            y: 50,
            left: {
                x: 52,
            },
            right: {
                x: 50,
            },
        }
        
        this.action = null;
        this.action_complete = true;
        
       

        if( options.movement ?? true ) {
            this.movement = new Movement(this);
            this.controls = new Controls(this);
        }

        this.attacks = new Attacks(this);

        this.is_hit = false;

        this.debugger = new Debugger(this);
    }
    
    update(time){
        this.update_bounds();
        this.movement.update(time);
        this.update_sprite(time);
        this.attacks.update(time);
    }

    draw(ctx){

        if( !this.sprites.ready ) return;

        const sprite = this.get_sprite();
        
        const w = this.sprites.frame_width;
        const h = this.sprites.frame_height;
        const sx = w * sprite.index;
        const sy = 0;

        const x = this.position.x - this.sprites_offset[this.direction].x;
        const y = this.position.y - this.sprites_offset.y;

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

        this.attacks.draw(ctx);

        this.debugger.draw(ctx);
    }

    update_bounds(){
        this.bounds = {
            top: this.position.y,
            right: this.position.x + this.width,
            bottom: this.position.y + this.height,
            left: this.position.x,
        }
    }

    update_sprite(time){

        const sprite_action = this.get_sprite();
        
        if( time.previous > this.animation_timer + sprite_action.animation_time ) {

            this.animation_timer = time.previous;

            // cycle through frames
            sprite_action.index++;
            if( sprite_action.index == sprite_action.frames_count) {
                sprite_action.index = 0;

                if( this.action ) {

                    if( typeof this.action_complete == 'function' ) {
                        this.action_complete(this.action);
                    }

                    this.on_action_animation_complete();

                    this.action = null;
                }
            }
        }
    }

    get_sprite(){
        const key = this.action ? this.action : this.state;
        return this.sprites[key];
    }

    on_action_complete(handler){
        this.action_complete = handler;
    }

    on_action_animation_complete(){

    }
    
}