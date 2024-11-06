class Hit_Effect_v1 {
    
    constructor(options){

        this.cols = options.cols ?? 0; 
        this.rows = options.rows ?? 0;
        this.col_index = 0;
        this.row_index = 0;

        this.width = 0;
        this.height = 0;

        this.img = new Image();
        this.img.onload = ()=>{
            this.width = this.img.width / this.cols;
            this.height = this.img.height / this.rows;
        }
        this.img.src = options.src;
        
        this.offset = options.offset ?? {
            x: 0,
            y: 0,
        }

        this.target = null;

        this.animation_time = options.animation_time ?? 60;
        this.animation_timer = 0;
        this.direction = null;
    }

    animate(target, direction){
        this.target = target;
        this.direction = direction;
    }

    draw(ctx){

        if( !this.target ) return;

        const sx = this.width * this.col_index;
        const sy = this.height * this.row_index;

        let x = this.target.bounds.right - this.offset.x;

        if( this.target.direction == 'left' ) {
            x = this.target.bounds.left - this.target.width - this.offset.x;
        }

        let y = this.target.bounds.top - this.offset.y;

        ctx.drawImage(this.img, sx, sy, this.width, this.height, x, y, this.width, this.height);
    }

    update(time){
        
        if( !this.target ) return;
        ;
        if( time.previous < this.animation_timer + this.animation_time )return;

        this.animation_timer = time.previous;

        this.col_index++;

        if( this.rows > 1 ) {
            
            if( this.col_index === this.cols ) {
                this.col_index = 0;
                this.row_index++;
            }

            if( this.row_index === this.rows ) {
                this.row_index = 0;
                this.on_complete();
            }

        }
        else {

            // single row
            if( this.col_index === this.cols ) {
                this.col_index = 0;
                this.on_complete();
            }

        }
        
    }

    on_complete(){
        this.target = null;
    }
}