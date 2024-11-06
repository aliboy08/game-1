function gamepad_1_input_scan(gp){

    // const gamepads = navigator.getGamepads();
    // const gp = gamepads[0];

    // analog left
    if( gp.axes[0] < -.5 ) {
        // left
        console.log('analog_left left')
    }
    else if( gp.axes[0] > .5 ) {
        // right
        console.log('analog_left right')
    }
    else if( gp.axes[1] > .5 ) {
        // down
        console.log('analog_left down')
    }
    else if( gp.axes[1] < -.5 ) {
        // up
        console.log('analog_left up')
    }

    // analog right
    if( gp.axes[2] < -.5 ) {
        // left
        console.log('analog_right left')
    }
    else if( gp.axes[2] > .5 ) {
        // right
        console.log('analog_right right')
    }
    else if( gp.axes[3] > .5 ) {
        // down
        console.log('analog_right down')
    }
    else if( gp.axes[3] < -.5 ) {
        // up
        console.log('analog_right up')
    }
    
    // x
    if( gp.buttons[0].pressed ) {
        console.log('x');
    }

    // square
    if( gp.buttons[2].pressed ) {
        console.log('square');
    }

    // circle
    if( gp.buttons[1].pressed ) {
        console.log('circle');
    }

    // triangle
    if( gp.buttons[3].pressed ) {
        console.log('triangle');
    }

    // d-pad
    // up
    if( gp.buttons[12].pressed ) {
        console.log('up');
    }
    // down
    if( gp.buttons[13].pressed ) {
        console.log('down');
    }
    // left
    if( gp.buttons[14].pressed ) {
        console.log('left');
    }
    // right
    if( gp.buttons[15].pressed ) {
        console.log('right');
    }

    // r1
    if( gp.buttons[5].pressed ) {
        console.log('r1');
    }
    // r2
    if( gp.buttons[7].pressed ) {
        console.log('r2');
    }

    // l1
    if( gp.buttons[4].pressed ) {
        console.log('l1');
    }
    // l2
    if( gp.buttons[6].pressed ) {
        console.log('l2');
    }

}