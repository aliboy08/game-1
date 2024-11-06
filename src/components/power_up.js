export default class Power_Up {

    constructor(player) {
        this.player = player;
        player.power = 1;

        // this.upgrade();
        // this.upgrade();
        // this.upgrade();
        // this.upgrade();
        // this.upgrade();
    }

    upgrade(){
        this.player.power++;
        this.increase_damage();
        this.increase_projectile_speed();
        this.increase_projectile_size();
    }

    increase_damage(){
        this.player.damage += .2;
        this.player.projectile_damage++;
    }

    increase_projectile_speed(){
        this.player.attacks.projectiles.velocity += 50;
    }

    increase_projectile_size(){
        this.player.attacks.projectiles.size += .05;
    }

}