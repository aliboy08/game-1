import Movement from './movement';
import Attacks from './attacks';
import Controls from './controls';
import sprites_loader from 'sprites/loader';
import { draw_sprites_player, update_sprites_player } from 'sprites/player/functions';
import { get_bounds } from 'lib/functions';
import Health_Bar from 'components/health_bar';

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

        this.bounds = get_bounds(this);

        this.speed = {
            move: 200,
            run: 400,
        };
        
        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.jump_force = 600;
        
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

        // this.health_bar = new Health_Bar(this);
        // this.debugger = new Debugger(this);
    }
    
    update(time, ctx){

        // console.log(this.velocity.y)
        
        this.bounds = get_bounds(this);
        this.movement.update(time);
        this.update_sprite(time);
        this.attacks.update(time, ctx);

        if( this.health_bar ) this.health_bar.update();
    }

    draw(ctx){

        if( !this.sprites.ready ) return;

        draw_sprites_player(ctx, this);

        this.attacks.draw(ctx);

        if( this.health_bar ) this.health_bar.draw(ctx);
    }

    update_sprite(time){
        update_sprites_player(time, this);
    }

    on_action_complete(handler){
        this.action_complete = handler;
    }

    on_action_animation_complete(){
        
    }
    
}