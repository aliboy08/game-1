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

export function get_bounds(object){
    return {
        top: object.position.y,
        right: object.position.x + object.width,
        bottom: object.position.y + object.height,
        left: object.position.x,
    }
}

export function bounds_intersecting(a, b){

    if( a.top > b.bottom ) return false;
    if( a.bottom < b.top ) return false; 

    if( a.right < b.right && a.right >= b.left ) {
        return true; // a - facing right
    }

    if( a.right > b.right && a.left <= b.right ) {
        return true; // a - facing left
    }

    return false;
}

export function remove_item(arr, item_to_remove){
    arr.forEach((item, i)=>{
        if( item == item_to_remove ) {
            arr.splice(i, 1);
        }
    })
}

export function cleanup_removed(arrays){
    for( const arr of arrays ) {
        for( let i = 0; i < arr.length; i++ ) {
            if( arr[i].queue_remove ) {
                arr.splice(i, 1);
            }
        }
    }
}

export function stand_over(entity, platform){
    entity.position.y = platform.position.y - entity.height;
    entity.is_grounded = true;
    entity.velocity.y = 0;
}

export function is_colliding(a, b){

    if( a.bounds.top > b.bounds.bottom ) return false;
    if( a.bounds.bottom < b.bounds.top ) return false;

    if( a.bounds.left < b.bounds.right &&
        a.bounds.right > b.bounds.right ) {
        // a - right
        return 'right';
    } 

    if( a.bounds.right > b.bounds.left &&
        a.bounds.left < b.bounds.left ) {
        // a - left
        return 'left';
    }
    
    return false;
}