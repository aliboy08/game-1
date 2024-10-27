import { player_land } from '../player/functions';

export function platform_collision(players, platforms){
    for( const player of players ) {
        for( const platform of platforms ) {
            platform_stand_over(player, platform);
        } 
    }
}

function platform_stand_over(player, platform){

    let is_falling = player.velocity.y > 0;
    if( !is_falling ) return;
    
    if( player.bounds.right < platform.bounds.left ) return;
    if( player.bounds.left > platform.bounds.right ) return;
    if( player.bounds.bottom > platform.bounds.top ) return;

    let platform_y = platform.bounds.top - player.height;

    if( player.position.y >= platform_y ) {
        player_land(player, platform_y)
    }
}