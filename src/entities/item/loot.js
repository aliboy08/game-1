import { get_random_percent, get_random_item } from 'lib/functions';
import Item from './item';

const drop_rate = 80; // 40%

const loot_table = [
    'health', 'mana', 'powerup'
];

export default class Loot_System {

    constructor(stage){
        this.stage = stage;
    }

    init_drop(entity){
        if( entity.init_loot ) return;
        entity.init_loot = true;

        if( !this.has_drop() ) return;

        const item_type = get_random_item(loot_table);

        entity.on_death = ()=>{
            const item = new Item(item_type, entity.position);
            item.looters = this.stage.players;
            this.stage.items.push(item);
        }
    }
    
    has_drop(){
        return get_random_percent(drop_rate);
    }
    
}