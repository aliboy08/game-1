export function get_canvas_bounds(canvas){

    const sprites_offset = {
        left: 45,
        right: 85,
    }

    const ground_height = 10;

    const bounds = {
        top: 0,
        left: 0 - sprites_offset.left,
        right: canvas.width - sprites_offset.right,
        bottom: canvas.height - ground_height,
    }

    return bounds;
}

export function check_bounds(player, bounds){
    // edge left
    if( player.direction == 'left' ) {
        if( player.position.x <= bounds.left ) {
            player.velocity.x = 0;
        }
    }
    // edge right
    else if ( player.direction == 'right' ) {
        if( player.position.x >= bounds.right ) {
            player.velocity.x = 0
        }
    } 
}