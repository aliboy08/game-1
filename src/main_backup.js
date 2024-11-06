import Stage from 'environment/stage';
import Player from 'entities/player/player';
import Enemy from 'entities/enemies/enemy';
import { objects_collision } from 'components/collision';
import { remove_item, get_random_min_max } from 'lib/functions';
import Debugger from 'components/debugger';

export const debug = {
    players: true,
    enemies: true,
    // items: false,
}

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

console.log('main.js')

function init(){
    const canvas = document.querySelector('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    
    const ctx = canvas.getContext('2d');
    
    // debug outline
    ctx.strokeStyle = "green";
        
    // fix scaling artifacts
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const stage = new Stage(canvas);
    
    const p1 = new Player({
        id: 'P1',
        model: 'Fighter',
        // model: 'Samurai',
        // model: 'Shinobi',
        x: 20,
        y: canvas.height
    });
    stage.players.push(p1);

    // const p2 = new Player({
    //     id: 'P2',
    //     model: 'Samurai',
    //     direction: 'left',
    //     x: canvas.width - 50,
    //     y: canvas.height
    // });
    // stage.players.push(p2);
    
    if( typeof p2 !== 'undefined' ) {
        collision_entities.push(p2)
        p2.status.position.x = stage.width - 250;
        p2.status.init();
        p1.attacks.targets.push(p2);
        p2.attacks.targets.push(p1);
    }
    
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
            stage[type].forEach(entity=>{
                entity.debugger = new Debugger(entity);
            })
        }
    }

    function debugger_draw(){
        for( const type in debug ) {
            if( !debug[type] ) continue;
            stage[type].forEach(entity=>{
                // entity.debugger.draw(ctx);
            })
        }
    }

    function cleanup_removed_items(){
        // enemies
        enemies.forEach(entity=>{
            entity.on_remove = ()=>{
                remove_item(enemies, entity);
                remove_item(p1.attacks.targets, entity);
                if( typeof p2 !== 'undefined' ) {
                    remove_item(p2.attacks.targets, entity);
                }
            }
        });
    }
}

window.addEventListener('load', init)