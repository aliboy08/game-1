import Stage from 'environment/stage';
import Player from 'entities/player/player';
import Enemy from 'entities/enemies/enemy';
import Item from 'entities/item/item';
import { objects_collision } from 'components/collision';
// import FPS_Counter from 'components/fps_counter';
import { remove_item } from 'lib/functions';
import Debugger from 'components/debugger';

const debug = {
    players: true,
    enemies: true,
    items: true,
}

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

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
    
    const stage = new Stage(canvas);
    
    const entities = {
        players: [
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
                // y: canvas.height
            }),
        ],
        enemies: [
            new Enemy({
                model: 'Orc_Warrior',
                x: 400,
                // y: canvas.height,
            }),
            // new Enemy({
            //     model: 'Orc_Warrior',
            //     direction: 'right',
            //     x: 560,
            // }),
            // new Enemy({
            //     model: 'Orc_Shaman',
            //     x: 20,
            // }),
            // new Enemy({
            //     model: 'Orc_Shaman',
            //     direction: 'right',
            //     x: 120,
            // }),
            // new Enemy({
            //     model: 'Orc_Berserk',
            //     x: 700,
            // }),
            // new Enemy({
            //     model: 'Orc_Berserk',
            //     direction: 'right',
            //     x: 800,
            // }),
        ],
        items: [
            new Item('health'),
            new Item('mana', {x: 100}),
            new Item('powerup', {x: 300} ),
        ],
    }
    stage.entities.push(...entities.players)
    stage.entities.push(...entities.enemies)
    stage.entities.push(...entities.items)

    entities.players.forEach(player=>{
        player.attacks.targets = entities.enemies;
    });

    entities.items.forEach(item=>{
        item.looters = entities.players;
    });

    const collision_entities = [];
    collision_entities.push(...entities.players)
    collision_entities.push(...entities.enemies)
    
    function init(){
        requestAnimationFrame(frame);
        debugger_init();
        cleanup_removed_items();
    }
    init();

    function frame(time){
        // for consistent fps on different refresh rates
        frame_time.seconds_passed = (time - frame_time.previous) / 1000;
        frame_time.previous = time;
        requestAnimationFrame(frame);
        update();
        draw();
    }
    
    function update(){
        stage.update(frame_time, ctx);

        // collision between players & enemies
        objects_collision(collision_entities);
    }
    
    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(ctx);
        debugger_draw();
    }

    function debugger_init(){
        for( const type in debug ) {
            if( !debug[type] ) continue;
            entities[type].forEach(entity=>{
                entity.debugger = new Debugger(entity);
            })
        }
    }

    function debugger_draw(){
        for( const type in debug ) {
            if( !debug[type] ) continue;
            entities[type].forEach(entity=>{
                entity.debugger.draw(ctx);
            })
        }
    }

    function cleanup_removed_items(){
        // enemies
        entities.enemies.forEach(entity=>{
            entity.on_remove = ()=>{
                remove_item(collision_entities, entity);
                remove_item(entities.enemies, entity);
                remove_item(stage.entities, entity);
            }
        });

        // items
        entities.items.forEach(entity=>{
            entity.on_remove = ()=>{
                remove_item(entities.items, entity);
                remove_item(stage.entities, entity);
            }
        });
    }
    
})