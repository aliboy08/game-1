export function gamepad_input_scan(gp, player){

    // analog left
    if( gp.axes[0] < -.5 ) {
        // left
        player.controls.move_left();
    }
    else if( gp.axes[0] > .5 ) {
        // right
        player.controls.move_right();
    }
    else if( gp.axes[1] > .5 ) {
        // down
    }
    else if( gp.axes[1] < -.5 ) {
        // up
        player.controls.jump();
    }

    if( gp.axes[0] > -.5 && gp.axes[0] < .5 ) {
        player.movement.movement_end();
    }
    
    // x
    if( gp.buttons[0].pressed ) {
        player.controls.jump();
    }

    // square
    if( gp.buttons[2].pressed ) {
        player.attacks.attack('attack_1');
    }

    // circle
    if( gp.buttons[1].pressed ) {
        player.attacks.attack('attack_3');
    }

    // triangle
    if( gp.buttons[3].pressed ) {
    }

    // d-pad
    // up
    if( gp.buttons[12].pressed ) {
    }
    // down
    if( gp.buttons[13].pressed ) {
    }
    // left
    if( gp.buttons[14].pressed ) {
    }
    // right
    if( gp.buttons[15].pressed ) {
    }

    // r1
    if( gp.buttons[5].pressed ) {
    }
    // r2
    if( gp.buttons[7].pressed ) {
        player.attacks.attack('attack_2');
    }

    // l1
    if( gp.buttons[4].pressed ) {
    
    }
    
    // l2
    if( gp.buttons[6].pressed ) {
        player.movement.run_start();
    }
    else {
        player.movement.run_end();
    }

}