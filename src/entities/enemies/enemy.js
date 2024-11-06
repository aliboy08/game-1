import Movement from './movement';
import Attacks from './attacks';
import Health_Bar from 'components/health_bar';
import Health from 'components/health';
import Enemy_AI from './ai/ai';
import { get_bounds, set_state_timeout } from 'lib/functions';
import get_enemies_data from './enemies_data';

const enemies_data = get_enemies_data();

export default class Enemy {

    constructor(options){

        this.model = options.model ?? 'Orc_Warrior';
        this.init_sprite_data();

        this.direction = options.direction ?? 'left';
        
        this.width = options.width ?? 42;
        this.height = options.height ?? 60;

        this.position = {
            x: options.x ?? 0,
            y: options.y ?? 0,
        }
        
        this.bounds = get_bounds(this);

        this.speed = {
            move: 50,
            run: 150,
        };
        
        this.velocity = {
            x: 0,
            y: 0,
        }
        
        this.jump_force = 500;
        
        this.state = 'Idle';
        this.action = null;
        this.action_complete = true;

        this.animation_timer = 0;
        
        this.is_dead = false;
        this.is_hit = false;
        this.with_collision = true;

        this.stagger = {
            state: false,
            time: 200,
            timer: null,
        }

        this.pause = {
            state: false,
            time: 800,
            timer: null,
        }

        this.health = new Health(10);
        this.health.on_zero = ()=>{
            this.dead();
        }
        this.health_bar = new Health_Bar(this);

        this.damage = 1;

        this.movement = new Movement(this);
        this.attacks = new Attacks(this);

        this.targets = [];
        this.current_target = null;
        
        if( options.ai ?? true ) {
            this.ai = new Enemy_AI(this);
        }
    }
    
    update(time, ctx){

        // console.log(this.state, this.is_dead)

        this.bounds = get_bounds(this);
        this.update_sprite(time);
        
        if( this.is_dead ) {
            this.state = 'Dead';
            return;
        };

        if( this.stagger.state ) return;
        if( this.pause.state ) return;

        this.movement.update(time);
        this.attacks.update(time, ctx);
        if( this.ai ) this.ai.update(time, ctx);
        if( this.health_bar ) this.health_bar.update();
    }

    draw(ctx){
        this.draw_sprite(ctx);
        if( this.is_dead ) return;

        this.attacks.draw(ctx);

        if( this.ai ) this.ai.draw(ctx);
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

        if( state.index === state.frames_count) {
            
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
        if( this.action === 'Hurt' ) {
            this.is_hit = false;
        }
    }

    before_attack_prevent(){
        if( this.stagger.state ) return true;
        if( this.pause.state ) return true;
        return false;
    }

    after_attack(){
        set_state_timeout(this, 'pause');
    }

    hit(damage){
        if( this.is_dead ) return;
        this.is_hit = true;
        this.action = 'Hurt';
        this.health.reduce(damage);
        set_state_timeout(this, 'stagger');
    }

    dead(){
        this.state = 'Dead';
        this.with_collision = false;
        this.is_dead = true;
        this.velocity.x = 0;
        this.is_moving = false;

        if( typeof this.on_death === 'function' ) {
            this.on_death();
        }
    }

    after_death_animation(){
        setTimeout(()=>this.remove(), 2000);
    }

    remove(){
        if( typeof this.on_remove === 'function' ) {
            this.on_remove();
        }
    }

    init_sprite_data(){

        this.data = enemies_data[this.model];
        this.data.scale = this.data.scale ?? 1;

        if( typeof this.data.offset === 'undefined' ) {
            this.data.offset = {
                y: 36,
                x: {
                    left: 36,
                    right: 20,
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