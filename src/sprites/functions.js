export function sprite_images_loader(options){

    const data = {
        frames_count: options.frames_count,
        max: {
            width: 0,
            height: 0,
        },
        ready: false,
    }
    
    let loaded = 0;

    const on_image_load = function(){

        // get max image width & height
        if( this.width > data.max.width ) data.max.width = this.width;
        if( this.height > data.max.height ) data.max.height = this.height;

        loaded++;

        if( loaded === options.frames_count ) {
            // ready
            data.ready = true;
        }
    }

    if( typeof options.file_names !== 'undefined' ) {
        data.images = load_images_filenames(options, on_image_load);
    }
    else {
        data.images = load_images_sequential(options, on_image_load);
    }

    return data;
}

function load_images_filenames(options, on_image_load){

    const images = [];
    
    options.file_names.forEach(file_name=>{
        const image = new Image();
        image.onload = on_image_load;
        image.src = options.base_image_path+file_name;
        images.push(image);
    });

    return images;
}

function load_images_sequential(options, on_image_load){

    const images = [];

    const file_extension = options.image_extension ?? '.png';
    const index_start = options.image_index_start ?? 1;
    const index_end = options.image_index_end ?? options.frames_count;

    // sequential images file names
    for( let i = index_start; i <= index_end; i++ ) {

        let image_index = i;
        if( image_index < 10 ) {
            image_index = '0'+image_index;
        }
        
        const image = new Image();
        image.onload = on_image_load;
        image.src = options.base_image_path + image_index + file_extension;
        images.push(image);
    }

    return images;
}