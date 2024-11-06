import AI_Roam from './roam';
import AI_Target from './target';
import AI_Attack from './attack';

export default class Enemy_AI {

    constructor(entity){
        this.entity = entity;
        
        this.target = new AI_Target(entity);
        this.roam = new AI_Roam(entity);
        this.attack = new AI_Attack(entity);

        this.target.on_target_set = ()=>{
            // target found, stop roaming
            this.roam.stop();
        }

        this.target.on_target_unset = ()=>{
            // target not found, continue roaming
            this.roam.start();
        }
    }

    update(time, ctx){
        if( this.entity.is_dead ) return;
        this.target.update();
        this.roam.update();
        this.attack.update();
    }

    draw(ctx){
        if( this.entity.is_dead ) return;
        this.target.draw(ctx);
        this.attack.draw(ctx);
    }
}