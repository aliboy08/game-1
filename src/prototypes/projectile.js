import Projectile_Sprite from '../entities/projectiles/projectile_sprite';

window.addEventListener('load', ()=>{

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'green';
    
    let frame_time = {
        previous: 0,
        seconds_passed: 0,
    }

    const sprite = new Projectile_Sprite({
        base_image_path: 'src/sprites/effects/water_projectile/water1000',
        frames_count: 20,
        scale: .13,
    });
    
    function update(time){
        if( sprite.ready ) {
            sprite.update(time);
        }
    }
    
    function draw(ctx){
        if( sprite.ready ) {
            sprite.draw(ctx);
        }
    }

    function frame(time){
    
        requestAnimationFrame(frame);
        
        // for consistent fps on different refresh rates
        update_frame_time(time);
        
        clear_canvas();

        update(frame_time);
        draw(ctx);
    }

    function update_frame_time(time){
        frame_time.seconds_passed = (time - frame_time.previous) / 1000;
        frame_time.previous = time;
    }

    function clear_canvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(frame);
    
})