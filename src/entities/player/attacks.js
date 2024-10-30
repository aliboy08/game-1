import { get_bounds, bounds_intersecting, remove_item } from '../../lib/functions';
import { sprites_data_effects } from '../../sprites/effects/sprites_data_effects';
import { draw_sprites_effects, update_sprites_effects } from '../../sprites/effects/functions';
import Projectiles from '../projectiles/projectiles';

export default class Attacks {

    constructor(player){
        this.player = player;
        
        this.player.on_action_complete(action=>{
            this.action = null;
        });

        this.action = null;

        this.attack_effect = null;
        this.hit_effect = null;

        this.animation_timer = 0;

        this.projectiles = new Projectiles({
            player: this.player,
            velocity: 300,
        });
    }

    attack_1(){
        this.player.action = 'Attack_1';
        
        this.action = {
            name: this.player.action,
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
                y: this.player.bounds.top+20,
            },
            width: 25,
            height: 10,
        }

        // this.attack_effect = {
        //     attacker: this.player,
        //     effect: sprites_data_effects.lightning_orb,
        // };

        this.on_attack();
    }
    
    attack_2(){

        this.player.action = 'Attack_2';

        this.action = {
            name: this.player.action,
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
                y: this.player.bounds.top+20,
            },
            width: 25,
            height: 10,
        }
        
        if( !this.projectiles.targets.length ) {
            this.projectiles.targets = this.targets;
        }

        this.projectiles.fire();

        // this.attack_effect = {
        //     attacker: this.player,
        //     effect: sprites_data_effects.lightning_orb,
        // };

        this.on_attack();
    }

    attack_3(){
        this.player.action = 'Attack_3';

        this.action = {
            name: this.player.action,
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
                y: this.player.bounds.top+20,
            },
            width: 25,
            height: 10,
        }

        // this.attack_effect = {
        //     attacker: this.player,
        //     effect: sprites_data_effects.lightning_orb,
        // };

        this.on_attack();
    }

    on_attack(){
        this.check_hit();
    }

    update(time, ctx){
        update_sprites_effects(time, this);

        this.projectiles.update(time);

        if( this.action ) {

        }
    }

    draw(ctx){

        draw_sprites_effects(ctx, this);
        
        this.projectiles.draw(ctx);

        if( this.action ) {
            if(typeof this.action.draw === 'function') this.action.draw(ctx);
        }
        
    }

    check_hit(){
        
        if( !this.targets ) return;

        const attack_bounds = get_bounds(this.action);

        for( const target of this.targets ) {
            
            if( bounds_intersecting( attack_bounds, target.bounds ) ) {
                target.is_hit = true;
                
                if( this.player.direction == 'right' ) {
                    target.position.x += 5;
                }
                else {
                    target.position.x -= 5;
                }

                this.hit_effect = {
                    attacker: this.player,
                    effect: sprites_data_effects.flame_impact,
                };
                
            }
        }
    }

}