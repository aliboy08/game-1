const controls = {
    P1: {
        KeyA: 'move_left',
        KeyD: 'move_right',
        KeyS: 'crouch',
        Space: 'jump',
        ShiftLeft: 'run',
        KeyJ: 'attack_1',
        KeyK: 'attack_2',
        KeyL: 'attack_3',
    },
    P2: {
        ArrowLeft: 'move_left',
        ArrowRight: 'move_right',
        ArrowDown: 'crouch',
        ArrowUp: 'jump',
        NumpadEnter: 'run',
        Numpad1: 'attack_1',
        Numpad2: 'attack_2',
        Numpad3: 'attack_3',
    }
}
export default class Controls {

    constructor(player) {

        this.player = player;

        this.pressing = {
            forward: false,
            backward: false,
        }

        document.addEventListener('keydown',e=>{
            if( !controls[player.id][e.code] ) return;
            if( player.is_dead ) return;
            this[controls[player.id][e.code]]();
            
        })

        document.addEventListener('keyup',(e)=>{
            if( !controls[player.id][e.code] ) return;
            if( player.is_dead ) return;
            this.action_end(controls[player.id][e.code]);
        });

    }

    move_left(){
        this.pressing.left = true;
        this.player.movement.move_left();
    }

    move_right(){
        this.pressing.right = true;
        this.player.movement.move_right();
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
        this.player.attacks.attack('attack_1');
    }
    attack_2(){
        this.player.attacks.attack('attack_2');
    }
    attack_3(){
        this.player.attacks.attack('attack_3');
    }

    action_end(action){
        
        if( action == 'move_right' ) {
            this.pressing.right = false;
            if( this.pressing.left ) {
                this.move_left();
            } else {
                this.player.movement.movement_end();
            }
        }

        if( action == 'move_left' ) {
            this.pressing.left = false;
            if( this.pressing.right ) {
                this.move_right();
            } else {
                this.player.movement.movement_end();
            }
        }
        
        if( action == 'run' ) {
            this.player.movement.run_end();
        }
    }
    
}