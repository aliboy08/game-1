import Effects from './effects';

import { remove_item, get_bounds, bounds_intersecting } from '../../lib/functions';
import Projectile from './projectile';

const lightning_orb = new Effects({
    src: '/src/sprites/effects/lightning_orb.png',
    cols: 5,
    rows: 2,
    offset: {
        x: 40,
        y: 40,
    },
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
            
            if( bounds_intersecting( bounds, target.bounds ) ) {
                target.is_hit = true;

                this.hit_effect.animate(projectile);
                
                if( projectile.direction == 'right' ) {
                    target.position.x += 5;
                }
                else {
                    target.position.x -= 5;
                }

                projectile.end();
            }
        }
    }

}