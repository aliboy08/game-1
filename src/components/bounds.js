const ground_height = 48;

function apply_bounds(entities, stage){

    const floor = stage.height - ground_height;

    for( const entity of entities ) {

        // top
        // if (player.position.y < 0 ) {
        //     player.position.y = 0;
        // }

        // bottom
        if (entity.position.y + entity.height >= floor ) {
            entity.position.y = floor - entity.height;
            entity.velocity.y = 0;
            entity.is_grounded = true;
        }
        
        // left
        if( entity.direction == 'left' ) {
            if( entity.position.x <= 0 ) {
                entity.position.x = 0;
                entity.velocity.x = 0;
            }
        }
        // right
        else if ( entity.direction == 'right' ) {

            const edge_right = stage.width - entity.width;

            if( entity.position.x >= edge_right ) {
                entity.position.x = edge_right;
                entity.velocity.x = 0
            }
        }
        
    }
}