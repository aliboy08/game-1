const regen_rate = 4000; // 1 in 4secs
const regen_amount = 1;

export default class Mana {

    constructor(amount) {
        this.max = amount;
        this.current = amount;
        this.percent = 1;
    }

    add(amount){
        this.current += amount;
        this.limit_max();
        this.update_percent();
    }

    reduce(cost){
        this.current -= cost;
        this.update_percent();
    }

    update_percent(){
        this.percent = this.current / this.max;
    }

    limit_max(){
        if( this.current > this.max ) {
            this.current = this.max;
        }
    }

    init_regen(){
        setInterval(()=>{
            this.add(regen_amount);
        }, regen_rate);
    }
}