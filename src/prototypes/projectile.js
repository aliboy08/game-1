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
    
    function update(time){
    }
    
    function draw(ctx){
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