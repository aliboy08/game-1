const ground_height = 10;

export function apply_bounds(players, canvas){

    const floor = canvas.height - ground_height;

    for( const player of players ) {

        // top
        // if (player.position.y < 0 ) {
        //     player.position.y = 0;
        // }
        // bottom
        if (player.position.y + player.height >= floor ) {
            player.position.y = floor - player.height;
            player.velocity.y = 0;
            player.is_grounded = true;
        }
        
        // left
        if( player.direction == 'left' ) {
            if( player.position.x <= 0 ) {
                player.position.x = 0;
                player.velocity.x = 0;
            }
        }
        // right
        else if ( player.direction == 'right' ) {

            const edge_right = canvas.width - player.width;

            if( player.position.x >= edge_right ) {
                player.position.x = edge_right;
                player.velocity.x = 0
            }
        }
        
    }
}