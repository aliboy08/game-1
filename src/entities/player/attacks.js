export default class Attacks {

    constructor(player){
        this.player = player;
    }

    attack_1(){
        this.player.action = 'Attack_1';
    }

    attack_2(){
        this.player.action = 'Attack_2';
    }

    attack_3(){
        this.player.action = 'Attack_3';
    }
    
}