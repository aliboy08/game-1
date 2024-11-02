import { get_bounds, is_colliding } from 'lib/functions';

const items = {
    health: {
        img: new Image(),
        width: 32,
        height: 32,
    },
    mana: {
        img: new Image(),
        width: 32,
        height: 32,
    },
    powerup: {
        img: new Image(),
        width: 32,
        height: 32,
    },
}
items.health.img.src = 'src/sprites/items/potions/Icon21.png';
items.mana.img.src = 'src/sprites/items/potions/Icon9.png';
items.powerup.img.src = 'src/sprites/items/potions/Icon43.png';

export default class Item {
    
    constructor(type, position = {}){

        this.type = type ?? 'health';
        this.sprite =  items[this.type];

        this.width = this.sprite.width;
        this.height = this.sprite.height;

        this.position = {
            x: position.x ?? 0,
            y: position.y ?? 0,
        }
        
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.bounds = get_bounds(this);

        this.looters = [];
    }

    update(time, ctx){
        // console.log('item update')
        // console.log(this.looter)
        this.bounds = get_bounds(this);
        this.check_collision();
    }

    draw(ctx){
       this.draw_image(ctx);
    }

    draw_image(ctx){
        if( this.looter ) return;
        ctx.drawImage(
            this.sprite.img,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    check_collision(){
        if( this.looter ) return;
        this.looters.forEach(looter=>{
            if( is_colliding( looter, this ) ) {
                this.pick_up(looter);
            }
        })
    }

    pick_up(looter){
        this.looter = looter;
        this.remove();
    }

    remove(){
        this.queue_remove = true;
        if( typeof this.on_remove === 'function' ) {
            this.on_remove();
        }
    }

}