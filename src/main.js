import Player from './entities/player/player';
import Platform from './entities/platform/platform';
// import FPS_Counter from './components/fps_counter';
import { platform_collision } from './entities/platform/functions';
import { apply_gravity } from './components/gravity';
import { apply_bounds } from './components/bounds';

window.addEventListener('load', ()=>{

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    
    const ctx = canvas.getContext('2d');
    
    // debug outline
    ctx.strokeStyle = "green";
    
    // fix scaling artifacts
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const entities = [];
    
    const platforms = [
        new Platform({ x: 0, y: 100 }),
        new Platform({ x: 400, y: 100 }),
        new Platform({ x: 800, y: 100 }),

        new Platform({ x: 200, y: 200 }),
        new Platform({ x: 500, y: 200 }),
        new Platform({ x: 900, y: 200 }),

        new Platform({ x: 100, y: 300 }),
        new Platform({ x: 300, y: 300 }),
        new Platform({ x: 650, y: 300 }),

        new Platform({ x: 0, y: 400 }),
        new Platform({ x: 450, y: 400 }),
        new Platform({ x: 750, y: 400 }),
    ];
    platforms.forEach(entity=>entities.push(entity));

    const players = [
        new Player({
            model: 'Shinobi',
        }),
        new Player({
            model: 'Samurai',
            x: 100,
        }),
        new Player({
            model: 'Fighter',
            x: 200
        }),
    ];
    players.forEach(entity=>entities.push(entity));

    let frame_time = {
        previous: 0,
        seconds_passed: 0,
    }
    
    function frame(time){
    
        requestAnimationFrame(frame); // raf - at top: sooner it can respond
        
        frame_time.seconds_passed = (time - frame_time.previous) / 1000;
        frame_time.previous = time;
    
        // clear 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        apply_gravity(players, frame_time)
        apply_bounds(players, canvas)
        platform_collision(players, platforms)

        update_entities(frame_time);
        
        draw_entities();
    }

    function update_entities(time){
        for(const entity of entities) {
            entity.update(time, ctx, entities);
        }
    }

    function draw_entities(){
        for(const entity of entities) {
            entity.draw(ctx);
        }
    }

    requestAnimationFrame(frame);
})