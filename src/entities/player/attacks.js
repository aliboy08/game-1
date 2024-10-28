import { get_bounds, bounds_intersecting } from '../../lib/functions';

export default class Attacks {

    constructor(player){
        this.player = player;
        
        this.player.on_action_complete(action=>{
            this.action = null;
        });

        this.action = null;
    }

    attack_1(){
        const action = 'Attack_1';
        this.player.action = action;
        
        this.action = {
            name: action,
            x: this.player.direction == 'right' ? this.player.bounds.right : this.player.bounds.left - this.player.width,
            y: this.player.bounds.top+20,
            width: 25,
            height: 10,
        }

        this.check_hit();
    }
    
    attack_2(){
        this.player.action = 'Attack_2';
    }

    attack_3(){
        this.player.action = 'Attack_3';
    }

    // update(){
    //     if( !this.action ) return;
    // }

    draw(ctx){
        if( !this.action ) return;
        if(typeof this.action.draw === 'function') this.action.draw(ctx);
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