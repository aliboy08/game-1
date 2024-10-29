export function draw_sprites_player(ctx, player){

    const sprite = get_sprite(player);
        
    const w = player.sprites.frame_width;
    const h = player.sprites.frame_height;
    const sx = w * sprite.index;
    const sy = 0;

    const x = player.position.x - player.sprites_offset[player.direction].x;
    const y = player.position.y - player.sprites_offset.y;

    if( player.direction == 'left' ) {
        // flip: direction - left
        ctx.save()
        ctx.scale(-1, 1)
        ctx.drawImage(sprite.img, sx, sy, w, h, -x-w, y, w, h)
        ctx.restore()
    }
    else {
        // default: direction - right
        ctx.drawImage(sprite.img, sx, sy, w, h, x, y, w, h); 
    }
    
}

export function update_sprites_player(time, player){

    const sprite_action = get_sprite(player);
        
    if( time.previous > player.animation_timer + sprite_action.animation_time ) {

        player.animation_timer = time.previous;

        // cycle through frames
        sprite_action.index++;
        if( sprite_action.index == sprite_action.frames_count) {
            sprite_action.index = 0;

            if( player.action ) {

                if( typeof player.action_complete == 'function' ) {
                    player.action_complete(player.action);
                }

                player.on_action_animation_complete();

                player.action = null;
            }
        }
    }
}

function get_sprite(player){
    const key = player.action ? player.action : player.state;
    return player.sprites[key];
}