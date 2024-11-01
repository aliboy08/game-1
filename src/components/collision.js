export function objects_collision(objects){
    
    for( const current of objects ) {

        // if( !current.is_moving ) continue;
        if( !current.movement ) continue;

        for( const object of objects ) {

            if( current == object ) continue;
            if( !object.with_collision ) continue;  
            
            const colliding = is_colliding( current, object );

            current.is_colliding = colliding;
            object.is_colliding = colliding;

            if( current.velocity.y < 0 ) continue; // allow jump away

            if( colliding == 'left' && current.direction == 'left' ) {
                current.position.x = object.bounds.right;
                current.movement.stop();
            }

            if( colliding == 'right' && current.direction == 'right' ) {
                current.position.x = object.bounds.left - current.width;
                current.movement.stop();
            }

        } 
    }
    
}

function is_colliding(current, object){

    if( current.bounds.top > object.bounds.bottom ) return false;
    if( current.bounds.bottom < object.bounds.top ) return false;

    // console.log(current.bounds.left, object.bounds.right)

    if( current.bounds.right > object.bounds.right ) {
        // current: right | object: left
        if( current.bounds.left <= object.bounds.right ) {
            // colliding left
            return 'left';
        }
    }
    else {
        // current: left | object: right
        if( current.bounds.right >= object.bounds.left ) {
            // colliding right
            return 'right';
        }
    }
    
    return false;
}
