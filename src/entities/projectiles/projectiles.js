import { remove_item, get_bounds, bounds_intersecting } from 'lib/functions';
import { sprite_images_loader } from 'sprites/functions';

import Effects from './effects';
import Projectile from './projectile';
import Projectile_Sprite from './projectile_sprite';

const lightning_orb = new Effects({
    src: '/src/sprites/effects/lightning_orb.png',
    cols: 5,
    rows: 2,
    offset: {
        x: 40,
        y: 40,
    },
});

const water_projectile = sprite_images_loader({
    base_image_path: 'src/sprites/effects/water_projectile/water1000',
    frames_count: 20,
});

export default class Projectiles {
    
    constructor(options){

        this.player = options.player;
        this.velocity = options.velocity;

        this.items = [];
        this.targets = [];

        this.hit_effect = lightning_orb;
    }

    fire(){

        const projectile = new Projectile({
            position: {
                x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left,
                y: this.player.bounds.top + 14,
            },
            width: 20,
            height: 20,
            velocity: this.velocity,
            direction: this.player.direction,
            sprite: new Projectile_Sprite({
                sprite: water_projectile,
                scale: .13,
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

    set_targets(targets){
        this.targets = targets;
    }

    check_hit(projectile){
        
        if( !this.targets ) return;

        const bounds = get_bounds(projectile);

        for( const target of this.targets ) {

            if( target.is_dead ) continue;
            
            if( bounds_intersecting( bounds, target.bounds ) ) {
                target.is_hit = true;

                this.hit_effect.animate(projectile);
                
                if( projectile.direction == 'right' ) {
                    target.position.x += 5;
                }
                else {
                    target.position.x -= 5;
                }

                if( typeof projectile.end === 'function' ) {
                    projectile.end();
                }
                
            }
        }
    }

}