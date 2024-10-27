import { sprites_data_player } from './player/sprites_data_player';
import { sprites_data_monsters } from './monsters/sprites_data_monsters';

export default function sprites_loader(model_name, type){

    let dir, model;

    if( type == 'player' ) {
        dir = '/src/sprites/player/';
        model = sprites_data_player[model_name];
    }
    else if (type == 'monster') {
        dir = '/src/sprites/monsters/';
        model = sprites_data_monsters[model_name];
    }

    const sprites = {
        frame_width: model.frame_width,
        frame_height: model.frame_height,
        ready: false,
        offset: model.offset ?? null,
    }

    let states = Object.keys(model.states);

    let sprites_loaded = 0;
    states.forEach(state=>{

        sprites[state] = {
            index: 0,
            frames_count: model.states[state].frames_count,
            animation_time: model.states[state].animation_time ?? 60,
        };
        
        const img = new Image();
        img.onload = ()=>{
            sprites_loaded++;
            if( sprites_loaded == states.length ) {
                // load complete
                sprites.ready = true;
            }
        }
        img.src = `${dir+model_name}/${state}.png`;

        sprites[state].img = img;
    })

    return sprites;
}