const actions = {
    KeyA: 'backward',
    KeyD: 'forward',
    KeyS: 'crouch',
    Space: 'jump',
    ShiftLeft: 'run',
    KeyJ: 'attack_1',
    KeyK: 'attack_2',
    KeyL: 'attack_3',
}

export default class Controls {

    constructor(player) {

        this.player = player;

        this.pressing = {
            forward: false,
            backward: false,
        }

        document.addEventListener('keydown',e=>{
            if( !actions[e.code] ) return;
            this[actions[e.code]]();
        })

        document.addEventListener('keyup',(e)=>{
            if( !actions[e.code] ) return;
            this.action_end(actions[e.code]);
        });

    }

    backward(){
        this.pressing.backward = true;
        this.player.movement.backward();
    }

    forward(){
        this.pressing.forward = true;
        this.player.movement.forward();
    }

    crouch(){
        // this.player.movement.crouch();
    }

    jump(){
        this.player.movement.jump();
    }

    run(){
        this.player.movement.run_start();
    }

    attack_1(){
        this.player.attacks.attack_1();
    }
    attack_2(){
        this.player.attacks.attack_2();
    }
    attack_3(){
        this.player.attacks.attack_3();
    }

    action_end(action){
        
        if( action == 'forward' ) {
            this.pressing.forward = false;
            if( this.pressing.backward ) {
                this.backward();
            } else {
                this.player.movement.movement_end();
            }
        }

        if( action == 'backward' ) {
            this.pressing.backward = false;
            if( this.pressing.forward ) {
                this.forward();
            } else {
                this.player.movement.movement_end();
            }
        }
        
        if( action == 'run' ) {
            this.player.movement.run_end();
        }
    }
    
}