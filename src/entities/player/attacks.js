import { get_bounds, get_collision_direction, sprite_images_loader } from 'lib/functions';
import Projectiles from 'entities/projectiles/projectiles';
import Hit_Effect from 'components/hit_effect';

const attack_2 = {
    mana_cost: 2,
}

const push_force = 5;

const hit_spark_2 = sprite_images_loader({
    base_image_path: 'src/sprites/effects/hit_spark_2/8213_',
    frames_count: 12,
    image_index_start: 0,
    leading_zero: false,
});

export default class Attacks {

    constructor(player){
        this.player = player;
        
        this.player.on_action_complete(action=>{
            this.action = null;
        });

        this.action = null;

        this.animation_timer = 0;
        
        this.targets = [];

        this.projectiles = new Projectiles({
            player: this.player,
            velocity: 300,
        });

        this.hit_effect = new Hit_Effect({
            sprite: hit_spark_2,
            scale: .15,
            animation_time: 30,
            offset: {
                y: 0,
                x: {
                    left: -20,
                    right: -40,
                }
            }
        });

        this.cooldown = {
            attack_1: false,
            attack_2: false,
            attack_3: false,
        }
        
        this.cooldown_time = {
            attack_1: 400,
            attack_2: 400,
            attack_3: 400,
        }
    }

    attack(type){
        if( this.cooldown[type] ) return;
        this.set_cooldown(type);
        this[type]();
        this.check_hit();
    }

    attack_1(){

        this.player.action = 'Attack_1';
        
        this.action = {
            name: this.player.action,
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
                y: this.player.bounds.top+20,
            },
            width: 28,
            height: 10,
        }
    }
    
    attack_2(){

        if( this.player.mana.current < attack_2.mana_cost ) return;
        this.player.mana.reduce(attack_2.mana_cost)

        this.player.action = 'Attack_2';

        this.action = {
            name: this.player.action,
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
                y: this.player.bounds.top+20,
            },
            width: 28,
            height: 10,
        }
        
        if( !this.projectiles.targets.length ) {
            this.projectiles.targets = this.targets;
        }

        this.projectiles.fire();
    }

    attack_3(){

        this.player.action = 'Attack_3';

        this.action = {
            name: this.player.action,
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
                y: this.player.bounds.top+20,
            },
            width: 28,
            height: 10,
        }
    }

    update(time){
        this.projectiles.update(time);
        this.hit_effect.update(time);  
    }

    draw(ctx){
        this.projectiles.draw(ctx);
        this.hit_effect.draw(ctx);

        if( this.action ) {
            if(typeof this.action.draw === 'function') this.action.draw(ctx);
        }
    }

    check_hit(){
        
        if( !this.targets ) return;

        const attack_bounds = get_bounds(this.action);

        for( const target of this.targets ) {

            if( target.is_dead ) continue;

            const hit_direction = get_collision_direction(attack_bounds, target.bounds);
            
            if( !hit_direction ) continue;
            
            target.hit(this.player.damage);

            this.hit_effect.animate(target, hit_direction);

            if( hit_direction == 'right' ) {
                target.position.x -= push_force;
            }
            else {
                target.position.x += push_force;
            }
        }
    }

    set_cooldown(key){
        this.cooldown[key] = true;
        setTimeout(()=>{
            this.cooldown[key] = false;
        }, this.cooldown_time[key]);
    }
    
}