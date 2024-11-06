import { get_bounds, get_collision_direction, sprite_images_loader, get_random_item } from 'lib/functions';
import Hit_Effect from 'components/hit_effect';

const push_force = 5;

const hit_spark = sprite_images_loader({
    base_image_path: 'public/sprites/effects/hit_spark_1/8200_',
    frames_count: 12,
    image_index_start: 0,
    leading_zero: false,
});

export default class Attacks {

    constructor(entity){
        this.entity = entity;
        
        this.entity.on_action_complete(action=>{
            this.action = null;
        });

        this.action = null;

        this.animation_timer = 0;

        this.attack_ready = true;
        this.attack_interval = 1000;

        this.hit_effect = new Hit_Effect({
            sprite: hit_spark,
            scale: .15,
            animation_time: 30,
            offset: {
                y: 20,
                x: {
                    left: -30,
                    right: -40,
                }
            }
        });

        this.cooldown = false;
        this.cooldown_time = 1200;
    }

    attack(){
        if( this.entity.before_attack_prevent() ) return;
        if( this.cooldown ) return;
        if( this.entity.stagger.state ) return;
        this.set_cooldown();
        this.attack_1();
        this.entity.after_attack();
    }

    attack_1(){
        
        this.entity.action = get_random_item(this.entity.data.attacks);

        const sprite = this.entity.get_sprite();
        const hit_time = sprite.hit ?? 0;

        setTimeout(()=>{

            if( this.entity.stagger.state ) return;
            
            const width = 20;
            const height = 20;
            
            this.action = {
                name: this.entity.action,
                position: {
                    x: this.entity.direction == 'right' ? this.entity.bounds.right : this.entity.bounds.left - width,
                    y: this.entity.bounds.top+20,
                },
                width,
                height,
            }

            this.check_hit();
            
        }, hit_time);

    }
    
    update(time){
        this.hit_effect.update(time);
    }

    draw(ctx){
        this.hit_effect.draw(ctx);
    
        if( this.action ) {
            if(typeof this.action.draw === 'function') this.action.draw(ctx);
        }
    }

    check_hit(){

        if( !this.entity.targets ) return;

        const attack_bounds = get_bounds(this.action);

        for( const target of this.entity.targets ) {

            if( target.is_dead ) continue;

            const hit_direction = get_collision_direction(attack_bounds, target.bounds);
            
            if( hit_direction ) {

                target.hit(this.entity.damage);

                this.hit_effect.animate(target, hit_direction);
                
                if( hit_direction == 'right' ) {
                    target.position.x -= push_force;
                }
                else {
                    target.position.x += push_force;
                }
                
            }
        }
    }

    set_cooldown(){
        this.cooldown = true;
        setTimeout(()=>{
            this.cooldown = false;
        }, this.cooldown_time);
    }
    
}