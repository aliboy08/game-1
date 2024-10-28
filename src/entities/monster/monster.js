import sprites_loader from '../../sprites/loader';
import Debugger from '../../components/debugger';

export default class Monster {

    constructor(options){

        this.model = options.model ?? 'Orc_Warrior';
        this.state = 'Idle';
        this.direction = options.direction ?? 'left';

        this.width = options.width ?? 42;
        this.height = options.height ?? 60;

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }

        this.health = 30;

        this.update_bounds();

        // this.speed = {
        //     move: 200,
        //     run: 400,
        // };
        
        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.animation_timer = 0
        this.sprites = sprites_loader(this.model, 'monster');
        this.sprites_offset = this.sprites.offset ?? {
            y: 36,
            left: {
                x: 36,
            },
            right: {
                x: 20,
            },
        }

        // this.jump_force = 550;
        
        this.action = null;
        this.action_complete = true;
        
        this.is_hit = false;

        this.debugger = new Debugger(this);

        this.last_frame = false;

        this.with_collision = true;
    }
    
    update(time){
        this.update_bounds();
        this.update_sprite(time);
        this.check_is_hit();
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

        if( this.last_frame ) return;

        const sprite_action = this.get_sprite();
        
        if( time.previous > this.animation_timer + sprite_action.animation_time ) {

            this.animation_timer = time.previous;

            // cycle through frames
            sprite_action.index++;

            if( sprite_action.index == sprite_action.frames_count) {
                
                if( sprite_action.name == 'Dead' ) {
                    sprite_action.index--;
                    this.after_death_animation();
                    return;
                }
                
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
        if( this.action == 'Hurt' ) {
            this.is_hit = false;
        }
    }
    
    check_is_hit(){
        if( !this.is_hit ) return;
        this.action = 'Hurt';
        this.health--;

        if( this.health <= 0 ) {
            this.dead();
        }
    }

    dead(){
        this.state = 'Dead';
        this.with_collision = false;
        this.is_dead = true;
    }

    after_death_animation(){
        
    }

}