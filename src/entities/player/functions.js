export function player_land(player, y){
    player.position.y = y;
    player.velocity.y = 0;
    player.is_grounded = true;
}

export function player_move_state(player){
    if( player.is_moving ) {
        player.state = 'Walk';
    }
    else {
        player.state = 'Idle';
    }
}