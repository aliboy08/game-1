import { remove_item, get_bounds, get_collision_direction } from 'lib/functions';
import { sprite_images_loader } from 'lib/functions'; 

import Projectile from './projectile';
import Projectile_Sprite from './projectile_sprite';
import Hit_Effect from 'components/hit_effect';

const push_force = 5;

const water_projectile = sprite_images_loader({
    base_image_path: 'src/sprites/effects/water_projectile/water1000',
    frames_count: 20,
});

const hit_spark_2 = sprite_images_loader({
    base_image_path: 'src/sprites/effects/hit_spark_2/8213_',
    frames_count: 12,
    image_index_start: 0,
    leading_zero: false,
});

export default class Projectiles {
    
    constructor(options){

        this.player = options.player;
        this.velocity = options.velocity;

        this.items = [];
        this.targets = [];

        this.size = .13;

        // this.hit_effect = lightning_orb;
        this.hit_effect = new Hit_Effect({
            sprite: hit_spark_2,
            scale: .15,
            animation_time: 30,
            offset: {
                y: 0,
                x: {
                    left: 0,
                    right: -60,
                }
            }
        });
    }

    fire(){

        let width = 331 * this.size;
        let height = 171 * this.size;
        
        let x = this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left;

        // let y = this.player.bounds.top + 14;
        let y = this.player.position.y + this.player.height/2;
        y -= height/2;
        y -= 10; // padding
        
        const projectile = new Projectile({
            position: { x, y, },
            width,
            height,
            velocity: this.velocity,
            direction: this.player.direction,
            sprite: new Projectile_Sprite({
                sprite: water_projectile,
                scale: this.size,
            }),
        });

        this.items.push(projectile);
    }

    update(time){

        this.hit_effect.update(time);

        if( !this.items.length ) return;
        
        this.items.forEach(item=>{

            item.update(time);

            this.check_hit(item);

            if( item.is_done ) {
                remove_item(this.items, item);
            }
        })
    }

    draw(ctx){

        this.hit_effect.draw(ctx);

        if( !this.items.length ) return;

        this.items.forEach(item=>{
            item.draw(ctx);
        })
    }

    check_hit(projectile){
        
        if( !this.targets ) return;

        const projectile_bounds = get_bounds(projectile);

        for( const target of this.targets ) {

            if( target.is_dead ) continue;

            const hit_direction = get_collision_direction(projectile_bounds, target.bounds)
            
            if( hit_direction ) {

                target.is_hit = true;
                target.hit(this.player.projectile_damage);

                // this.hit_effect.animate(target, hit_direction);
                this.hit_effect.animate(target, hit_direction);
                
                if( hit_direction == 'right' ) {
                    target.position.x += push_force;
                }
                else {
                    target.position.x -= push_force;
                }
                
                if( typeof projectile.end === 'function' ) {
                    projectile.end();
                }
                
            }
        }
    }

}