import Player from 'entities/player/player';
import Monster from 'entities/monster/monster';
import Platform from 'entities/platform/platform';
import Floor from 'environment/floor';
import { platform_collision } from 'entities/platform/functions';
import { apply_gravity } from 'components/gravity';
import { apply_bounds } from 'components/bounds';
import { objects_collision } from 'components/collision';
// import FPS_Counter from 'components/fps_counter';
import { remove_item } from 'lib/functions';

window.addEventListener('load', ()=>{

    const canvas = document.querySelector('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    
    const ctx = canvas.getContext('2d');
    console.log(ctx)
    
    // debug outline
    ctx.strokeStyle = "green";
    
    // fix scaling artifacts
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
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
    });
    
    let frame_time = {
        previous: 0,
        seconds_passed: 0,
    }
    
    const environment = [
        new Floor(ctx),
    ];

    const draw_items = [
        environment,
        platforms,
        monsters,
        players,
    ];

    const update_items = [
        monsters,
        players,
    ];
    
    const collision_items = [];
    collision_items.push(...monsters)
    collision_items.push(...players)

    const apply_gravity_items = [
        monsters,
        players,
    ];

    const apply_bounds_items = [
        monsters,
        players,
    ];
    
    function frame(time){
        // for consistent fps on different refresh rates
        frame_time.seconds_passed = (time - frame_time.previous) / 1000;
        frame_time.previous = time;
        requestAnimationFrame(frame);
        update();
        draw();
    }
    
    function update(){

        // gravity
        apply_gravity_items.forEach(group=>{
            apply_gravity(group, frame_time);
        })

        // top, right, left, bottom
        apply_bounds_items.forEach(group=>{
            apply_bounds(group, canvas);
        })
        
        // collision
        platform_collision(players, platforms);
        platform_collision(monsters, platforms);
        objects_collision(collision_items);

        update_items.forEach(group=>{
            group.forEach(item=>{
                item.update(frame_time, ctx);
            })
        })
    }
    
    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_items.forEach(group=>{
            group.forEach(item=>item.draw(ctx));
        })
    }

    requestAnimationFrame(frame);

    // cleanup on remove
    monsters.forEach(item=>{
        item.on_remove = ()=>{
            remove_item(monsters, item);
            remove_item(draw_items, item);
            remove_item(update_items, item);
            remove_item(collision_items, item);
            remove_item(apply_bounds_items, item);
            remove_item(apply_gravity_items, item);
        }
    });
    
})