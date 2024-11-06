import Stage from 'environment/stage';
import Player from 'entities/player/player';
import Enemy from 'entities/enemies/enemy';
import Debugger from 'components/debugger';
import { objects_collision } from 'components/collision';
import { remove_item, get_random_min_max, get_random_item } from 'lib/functions';
// import { gamepad_input_scan } from 'components/gamepad';

const debug = {
    players: false,
    enemies: false,
}

const frame_time = {
    previous: 0,
    seconds_passed: 0,
}

// let gamepad_ready = false;
let canvas;
let ctx;
let stage;
let p1;
let p2;
let enemies = [];
let collision_entities = [];

function init(){
    init_canvas();
    init_game();
    requestAnimationFrame(frame);
}
window.addEventListener('load', init);

function init_game(){

    stage = new Stage(canvas);

    init_player_1();
    init_player_2();
    init_enemies();
    collission_entities_init();
    init_gamepad();
}

function init_player_1(){

    p1 = new Player({
        id: 'P1',
        model: 'Fighter',
        // model: 'Samurai',
        // model: 'Shinobi',
        x: 20,
        y: canvas.height
    });

    stage.players.push(p1);

    if( debug.players ) p1.debugger = new Debugger(p1);
}

function init_enemies(){

    enemies = [
        // new Enemy({
        //     model: 'Plent',
        //     x: 300,
        //     y: canvas.height,
        //     // ai: false,
        // }),
        new Enemy({
            model: 'Orc_Warrior',
            x: 300,
            y: canvas.height,
            // ai: false,
        }),
        // new Enemy({
        //     model: 'Orc_Berserk',
        //     x: 500,
        //     y: canvas.height,
        // }),
        // new Enemy({
        //     model: 'Orc_Shaman',
        //     x: 700,
        //     y: canvas.height,
        // }),
    ];
    // console.log(enemies[0]);
    stage.enemies = enemies;
    
    enemies.forEach(enemy=>init_enemy(enemy));
    setInterval(()=>create_enemy(), 4000);
}

function create_enemy(){
    const enemy = new Enemy({
        // model: 'Orc_Warrior',
        model: get_random_item([
            'Orc_Warrior',
            'Orc_Berserk',
            'Orc_Shaman',
            'Skeleton',
            'Fire_Spirit',
            'Plent',
        ]),
        x: get_random_min_max(10, canvas.width-10),
        y: get_random_min_max(0, canvas.height-200),
    });
    init_enemy(enemy);
}

function init_enemy(enemy){

    enemies.push(enemy);
    stage.loot_system.init_drop(enemy);
    collision_entities.push(enemy);
    p1.attacks.targets.push(enemy);
    enemy.targets.push(p1);

    if( debug.enemies ) enemy.debugger = new Debugger(enemy);
    
    if( typeof p2 !== 'undefined' && !p2.is_dead ) {
        p2.attacks.targets.push(enemy);
        enemy.targets.push(p2);
    }

    remove_init(enemy)
}

function collission_entities_init(){
    collision_entities.push(p1)
    collision_entities.push(...enemies)
}

function init_player_2(){

    p2 = new Player({
        id: 'P2',
        model: 'Samurai',
        direction: 'left',
        x: canvas.width - 50,
        y: canvas.height
    });

    stage.players.push(p2);
    collision_entities.push(p2)
    p1.attacks.targets.push(p2);
    p2.attacks.targets.push(p1);

    p2.status.position.x = stage.width - 250;
    p2.status.init();

    if( debug.players ) p2.debugger = new Debugger(p2);
}

function debugger_draw(){
    for( const type in debug ) {
        if( !debug[type] ) continue;
        stage[type].forEach(entity=>{
            if( entity.debugger ) entity.debugger.draw(ctx);
        })
    }
}

function remove_init(entity){
    entity.on_remove = ()=>{
        remove_item(enemies, entity);
        remove_item(p1.attacks.targets, entity);
        if( typeof p2 !== 'undefined' ) {
            remove_item(p2.attacks.targets, entity);
        }
    }
}

function init_canvas(){
    canvas = document.querySelector('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    
    ctx = canvas.getContext('2d');
    
    // debug outline
    ctx.strokeStyle = "green";
        
    // fix scaling artifacts
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

function frame(time){
    // for consistent fps on different refresh rates
    frame_time.seconds_passed = (time - frame_time.previous) / 1000;
    frame_time.previous = time;
    requestAnimationFrame(frame);
    
    // if( gamepad_ready ) {
    //     gamepad_input_scan(navigator.getGamepads()[0], p1);
    // }

    update(frame_time);
    draw(ctx);
}

function update(time){
    stage.update(time, ctx);
    objects_collision(collision_entities);
}

function draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stage.draw(ctx);
    debugger_draw(ctx);
}

function init_gamepad(){
    window.addEventListener("gamepadconnected", (e) => {
        console.log(
          "Gamepad connected at index %d: %s. %d buttons, %d axes.",
          e.gamepad.index,
          e.gamepad.id,
          e.gamepad.buttons.length,
          e.gamepad.axes.length,
        );
        gamepad_ready = true;
    });
}