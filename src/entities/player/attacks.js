import { get_bounds, bounds_intersecting } from '../../lib/functions';

const effect_1 = {
    img: new Image(),
    cols: 5,
    rows: 2,
    index: {
        col: 0,
        row: 0,
    },
    offset: {
        x: 40,
        y: 40,
    },
    animation_time: 60,
    draw: (ctx) => {

        let w = effect_1.img.width / effect_1.cols;
        let h = effect_1.img.height / effect_1.rows;

        let sx = w * effect_1.index.col;
        let sy = h * effect_1.index.row;

        let x = effect_1.player.bounds.right - effect_1.offset.x;
        if( effect_1.player.direction == 'left' ) {
            x = effect_1.player.bounds.left - effect_1.player.width - effect_1.offset.x;
        }

        let y = effect_1.player.bounds.top - effect_1.offset.y;

        ctx.drawImage(effect_1.img, sx, sy, w, h, x, y, w, h);
    }
}
effect_1.img.src = '/src/sprites/effects/lightning_orb.png';


const effect_2 = {
    img: new Image(),
    cols: 4,
    rows: 1,
    index: {
        col: 0,
        row: 0,
    },
    animation_time: 60,
    offset: {
        x: 70,
        y: 70,
    },
    draw: (ctx) => {

        let w = effect_2.img.width / effect_2.cols;
        let h = effect_2.img.height / effect_2.rows;

        let sx = w * effect_2.index.col;
        let sy = h * effect_2.index.row;

        let x = effect_2.player.bounds.right - effect_2.offset.x;
        if( effect_2.player.direction == 'left' ) {
            x = effect_2.player.bounds.left - effect_2.player.width - effect_2.offset.x;
        }

        let y = effect_2.player.bounds.top - effect_2.offset.y;

        ctx.drawImage(effect_2.img, sx, sy, w, h, x, y, w, h); 
    }
}
effect_2.img.src = '/src/sprites/effects/flame_impact.png';

export default class Attacks {

    constructor(player){
        this.player = player;
        
        this.player.on_action_complete(action=>{
            this.action = null;
        });

        this.action = null;
        this.effect = null;

        this.effect_animation_timer = 0;

        effect_1.player = this.player;
        effect_2.player = this.player;
    }

    attack_1(){
        this.player.action = 'Attack_1';
        
        this.action = {
            name: this.player.action,
            x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
            y: this.player.bounds.top+20,
            width: 25,
            height: 10,
        }

        this.effect = effect_1;

        this.on_attack();
    }
    
    attack_2(){
        this.player.action = 'Attack_2';

        this.action = {
            name: this.player.action,
            x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
            y: this.player.bounds.top+20,
            width: 25,
            height: 10,
        }

        this.effect = effect_2;

        this.on_attack();
    }

    attack_3(){
        this.player.action = 'Attack_3';

        this.action = {
            name: this.player.action,
            x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
            y: this.player.bounds.top+20,
            width: 25,
            height: 10,
        }

        // this.effect = effect_1;

        this.on_attack();

    }

    on_attack(){
        this.check_hit();
    }

    update(time){
        this.update_effect(time);
        if( !this.action ) return;
    }

    update_effect(time){

        if( !this.effect ) return;

        if( time.previous > this.effect_animation_timer + 60 ) {
            this.effect_animation_timer = time.previous;

            this.effect.index.col++;
            
            // if( this.effect.index.col === this.effect.cols ) {
            //     this.effect.index.col = 0;
            //     this.effect.index.row++;
            // }

            // if( this.effect.index.row === this.effect.rows ) {
            //     this.effect.index.row = 0;
            //     this.effect = null;
            // }

            if( this.effect.rows > 1 ) {
                
                if( this.effect.index.col === this.effect.cols ) {
                    this.effect.index.col = 0;
                    this.effect.index.row++;
                }
    
                if( this.effect.index.row === this.effect.rows ) {
                    this.effect.index.row = 0;
                    this.effect = null;
                }

            }
            else {

                if( this.effect.index.col === this.effect.cols ) {
                    this.effect.index.col = 0;
                    this.effect = null;
                }

            }
            
        }
    }

    draw(ctx){
        this.draw_effect(ctx);
        if( !this.action ) return;
        if(typeof this.action.draw === 'function') this.action.draw(ctx);
    }

    draw_effect(ctx){
        if( !this.effect ) return;
        this.effect.draw(ctx);
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
                
            }
        }
    }

}