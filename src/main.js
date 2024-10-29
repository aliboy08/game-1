import Player from './entities/player/player';
import Monster from './entities/monster/monster';
import Platform from './entities/platform/platform';
// import FPS_Counter from './components/fps_counter';
import { platform_collision } from './entities/platform/functions';
import { apply_gravity } from './components/gravity';
import { apply_bounds } from './components/bounds';
import { objects_collision } from './components/collision';

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

    const entities_with_collision = [];
    
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
    
    const monsters = [
        new Monster({
            model: 'Orc_Warrior',
            x: 400,
            y: canvas.height,
        }),
        new Monster({
            model: 'Orc_Warrior',
            direction: 'right',
            x: 560,
        }),
        new Monster({
            model: 'Orc_Shaman',
            x: 20,
        }),
        new Monster({
            model: 'Orc_Shaman',
            direction: 'right',
            x: 120,
        }),
        new Monster({
            model: 'Orc_Berserk',
            x: 700,
        }),
        new Monster({
            model: 'Orc_Berserk',
            direction: 'right',
            x: 800,
        }),
    ];
    monsters.forEach(entity=>{
        entities.push(entity)
        entities_with_collision.push(entity)
    });

    const players = [
        // new Player({
        //     model: 'Shinobi',
        // }),
        // new Player({
        //     model: 'Samurai',
        //     x: 500,
        // }),
        new Player({
            model: 'Fighter',
            x: 200,
            y: canvas.height
        }),
    ];
    players.forEach(entity=>{
        entity.attacks.targets = monsters;
        entities.push(entity)
        entities_with_collision.push(entity)
    });

    let frame_time = {
        previous: 0,
        seconds_passed: 0,
    }
    
    function frame(time){
    
        requestAnimationFrame(frame);

        clean_up_dead([ entities, monsters, entities_with_collision ]);
        
        // for consistent fps on different refresh rates
        update_frame_time(time);
        
        clear_canvas();
        
        apply_gravity(players, frame_time)
        apply_gravity(monsters, frame_time)

        // top, right, left, bottom
        apply_bounds(players, canvas)
        apply_bounds(monsters, canvas)
        
        platform_collision(players, platforms)
        platform_collision(monsters, platforms)

        objects_collision(entities_with_collision);
        update_entities(frame_time);
        
        draw_entities();
    }

    function update_frame_time(time){
        frame_time.seconds_passed = (time - frame_time.previous) / 1000;
        frame_time.previous = time;
    }

    function clear_canvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    function clean_up_dead(arrays){
        for( const arr of arrays ) {
            for( let i = 0; i < arr.length; i++ ) {
                if( arr[i].queue_remove ) {
                    arr.splice(i, 1);
                }
            }
        }
    }

    requestAnimationFrame(frame);
})