import { get_bounds, is_colliding } from 'lib/functions';

const items = {
    health: {
        sprite: {
            img: new Image(),
            width: 32,
            height: 32,
        },
        effect: (looter)=>{
            looter.health.add(20);
        }
    },
    mana: {
        sprite: {
            img: new Image(),
            width: 32,
            height: 32,
        },
        effect: (looter)=>{
            looter.mana.add(30);
        }
    },
    powerup: {
        sprite: {
            img: new Image(),
            width: 32,
            height: 32,
        },
        effect: (looter)=>{
            looter.power_up.upgrade();
        }
    },
}
items.health.sprite.img.src = 'src/sprites/items/potions/Icon21.png';
items.mana.sprite.img.src = 'src/sprites/items/potions/Icon9.png';
items.powerup.sprite.img.src = 'src/sprites/items/potions/Icon43.png';

export default class Item {
    
    constructor(type, position = {}){

        this.type = type ?? 'health';
        this.effect = items[this.type].effect;
        this.sprite =  items[this.type].sprite;

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
        if( typeof this.effect === 'function' ) {
            this.effect(looter);
        }
        this.remove();
    }

    remove(){
        if( typeof this.on_remove === 'function' ) {
            this.on_remove();
        }
    }

}