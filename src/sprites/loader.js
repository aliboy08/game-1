import { sprites_data } from './data';

export default function sprites_loader(model_name){

    const model = sprites_data[model_name];

    const sprites = {
        frame_width: model.frame_width,
        frame_height: model.frame_height,
        ready: false,
    }

    let states = Object.keys(model.states)

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
        img.src = `/src/sprites/${model_name}/${state}.png`;

        sprites[state].img = img;
    })

    return sprites;
}