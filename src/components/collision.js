import { get_collision_direction } from 'lib/functions';

const push_force = .05;

export function objects_collision(objects){
    
    for( const current of objects ) {

        if( !current.with_collision ) continue;
        if( current.is_dead ) continue;
        
        for( const object of objects ) {
            
            if( current == object ) continue;
            if( !object.with_collision ) continue;
            if( object.is_dead ) continue;
            
            const direction = get_collision_direction(current.bounds, object.bounds);

            if( !direction ) continue;

            const push_distance = object.width * push_force;

            if( direction == 'right' ) {
    
                if( object.is_immovable ) {
                    stop_movement(current, object);
                }
                else {
                    // slow down current
                    current.position.x += push_distance;
                    // push object
                    object.position.x -= push_distance;
                }
            }
            else if( direction == 'left' ) {
                if( object.is_immovable ) {
                    stop_movement(current, object);
                }
                else {
                    current.position.x -= push_distance;
                    object.position.x += push_distance;
                }
            }
            
        } 
    }
    
}

function stop_movement(current, object){

    if( current.velocity.y < 0 ) {
        // allow jump away
        return;
    }

    current.position.x = object.bounds.right;
    current.movement.stop();
}