import { get_bounds } from 'lib/functions';

export function platform_collision(entities, platforms){
    for( const entity of entities ) {
        for( const platform of platforms ) {
            platform_stand_over(entity, platform);
        } 
    }
}

function platform_stand_over(entity, platform){
    
    let is_falling = entity.velocity.y > 0;
    if( !is_falling ) return;
    
    if( entity.bounds.right < platform.bounds.left ) return;
    if( entity.bounds.left > platform.bounds.right ) return;
    if( entity.bounds.bottom > platform.bounds.top ) return;

    let platform_y = platform.position.y - entity.height;
    
    if( entity.position.y >= platform_y ) {
        entity.position.y = platform_y;
        entity.is_grounded = true;
        entity.velocity.y = 0;
    }
}