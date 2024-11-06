import Movement from './movement';
import Attacks from './attacks';
import Controls from './controls';
import { get_bounds } from 'lib/functions';
import Player_Status from './status';
import Mana from 'components/mana';
import Health from 'components/health';
import Power_Up from 'components/power_up';
import get_players_data from './players_data';

const players_data = get_players_data();

export default class Player {

    constructor(options){

        this.id = options.id ?? 'P';
        this.model = options.model ?? 'Samurai';
        this.init_sprite_data();
        
        this.width = options.width ?? 26;
        this.height = options.height ?? 74;

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }

        this.bounds = get_bounds(this);

        this.direction = options.direction ?? 'right';

        this.speed = {
            move: 200,
            run: 400,
        };
        
        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.jump_force = 500;
        
        this.animation_timer = 0;

        this.state = 'Idle';
        this.action = null;
        this.action_complete = true;
        this.is_dead = false;
        this.is_hit = false;
        this.with_collision = true;
        
        this.movement = new Movement(this);
        this.controls = new Controls(this);
        this.attacks = new Attacks(this);
        
        this.health = new Health(50);
        this.health.on_zero = ()=>{
            this.dead();
        }

        this.mana = new Mana(50);
        this.mana.init_regen();

        this.damage = 1;
        this.projectile_damage = 1;
        this.power_up = new Power_Up(this);

        this.status = new Player_Status(this);

        this.targets = [];
    }
    
    update(time, ctx){
        // console.log(this.velocity.y)
        this.bounds = get_bounds(this);
        this.update_sprite(time);
        this.movement.update(time);
        this.attacks.update(time, ctx);
        if( this.status ) this.status.update();
        if( this.health_bar ) this.health_bar.update();
    }

    draw(ctx){

        this.draw_sprite(ctx);

        this.attacks.draw(ctx);

        if( this.status ) this.status.draw(ctx);
        if( this.health_bar ) this.health_bar.draw(ctx);
    }

    draw_sprite(ctx){

        const state = this.get_sprite();

        const {width, height, scale} = this.data;

        let sx = width * state.index;
        let sy = 0;

        let { x, y } = this.position;
        x -= this.data.offset.x[this.direction];
        y -= this.data.offset.y;
        
        if( this.direction === 'left' ) {
            // flip: direction - left
            ctx.save()
            ctx.scale(-1, 1)
            ctx.drawImage(
                state.img,
                sx, sy,
                width, height,
                -x-(width*scale), y,
                width*scale, height*scale
            );
            ctx.restore()
        }
        else {
            ctx.drawImage(
                state.img,
                sx, sy,
                width, height,
                x, y,
                width*scale, height*scale
            );
        }
    }

    update_sprite(time){
        
        const state = this.get_sprite();

        if( time.previous < this.animation_timer + state.time ) return;

        this.animation_timer = time.previous;
       
        // cycle through frames
        state.index++;

        if( state.index == state.frames_count) {
            
            if( state.name === 'Dead' ) {
                state.index--;
                this.after_death_animation();
                return;
            }
            
            state.index = 0;
            
            if( this.action ) {
                
                if( typeof this.action_complete === 'function' ) {
                    this.action_complete(this.action);
                }

                this.on_action_animation_complete();

                this.action = null;
            }
        }
        
    }
    
    on_action_complete(handler){
        this.action_complete = handler;
    }

    on_action_animation_complete(){
        if( this.action == 'Hurt' ) {
            this.is_hit = false;
        }
    }

    dead(){
        this.is_dead = true;
        this.state = 'Dead';
        this.with_collision = false;
        this.velocity.x = 0;
        this.is_moving = false;
    }

    hit(damage){
        if( this.is_dead ) return;
        this.is_hit = true;
        this.action = 'Hurt';
        this.health.reduce(damage);
    }

    after_death_animation(){
        
    }

    init_sprite_data(){

        this.data = players_data[this.model];
        this.data.scale = this.data.scale ?? 1;

        if( typeof this.data.offset === 'undefined' ) {
            this.data.offset = {
                y: 50,
                x: {
                    left: 52,
                    right: 50,
                }
            }
        }
        
        for( const state_name in this.data.states ) {
            const state = this.data.states[state_name];
            if( typeof state.time === 'undefined' ) {
                state.time = 100;
            }
        }
    }

    get_sprite(){
        return this.data.states[this.action||this.state];
    }

}