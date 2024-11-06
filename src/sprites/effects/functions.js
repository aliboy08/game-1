function draw_sprites_effects(ctx, action){
    draw_attack_effect(ctx, action);
    draw_hit_effect(ctx, action);
}

function update_sprites_effects(time, action){
    update(time, action, 'hit_effect');
    update(time, action, 'attack_effect');
}

function draw_attack_effect(ctx, action){
    if( !action.attack_effect ) return;
    draw(ctx, action.attack_effect.effect, action.attack_effect.attacker);
}

function draw_hit_effect(ctx, action){
    if( !action.hit_effect ) return;
    draw(ctx, action.hit_effect.effect, action.hit_effect.attacker);
}

function update( time, action, key ) {

    const type = action[key];
    if( !type ) return;

    const effect = type.effect;

    if( time.previous > action.animation_timer + effect.animation_time ) {
        action.animation_timer = time.previous;

        effect.index.col++;

        if( effect.rows > 1 ) {
            
            if( effect.index.col === effect.cols ) {
                effect.index.col = 0;
                effect.index.row++;
            }

            if( effect.index.row === effect.rows ) {
                effect.index.row = 0;
                action[key] = null;
            }

        }
        else {

            // single row
            if( effect.index.col === effect.cols ) {
                effect.index.col = 0;
                action[key] = null;
            }

        }
        
    }
}

function draw(ctx, effect, target){

    const w = effect.img.width / effect.cols;
    const h = effect.img.height / effect.rows;

    const sx = w * effect.index.col;
    const sy = h * effect.index.row;

    let x = target.bounds.right - effect.offset.x;
    if( target.direction == 'left' ) {
        x = target.bounds.left - target.width - effect.offset.x;
    }

    let y = target.bounds.top - effect.offset.y;

    ctx.drawImage(effect.img, sx, sy, w, h, x, y, w, h);
}