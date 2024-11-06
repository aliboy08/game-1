import { sprite_images_loader_2 } from 'lib/functions';

const data = {
    Orc_Warrior: {
        height: 96,
        width: 96,
        states: {
            Attack_1: {
                time: 140,
                hit: 400,
            },
            Attack_2: {
                time: 140,
                hit: 400,
            },
            Attack_3: {
                time: 140,
                hit: 400,
            },
            Run_Attack: {
                time: 140,
                hit: 400,
            },
            Dead: {},
            Hurt: {},
            Idle: {},
            Run: {},
            Walk: {},
        },
        sprites: {},
        attacks: ['Attack_1', 'Attack_2', 'Attack_3', 'Run_Attack'],
    },
    Orc_Berserk: {
        height: 96,
        width: 96,
        states: {
            Attack_1: {
                time: 140,
                hit: 300,
            },
            Attack_2: {
                time: 140,
                hit: 400,
            },
            Attack_3: {
                time: 140,
                hit: 400,
            },
            Run_Attack: {
                time: 140,
                hit: 400,
            },
            Dead: {},
            Hurt: {},
            Idle: {},
            Run: {},
            Walk: {},
        },
        sprites: {},
        attacks: ['Attack_1', 'Attack_2', 'Attack_3', 'Run_Attack'],
    },
    Orc_Shaman: {
        height: 96,
        width: 96,
        states: {
            Attack_1: {
                time: 140,
                hit: 300,
            },
            Attack_2: {
                time: 140,
                hit: 400,
            },
            Magic_1: {
                time: 140,
                hit: 400,
            },
            Magic_2: {
                time: 140,
                hit: 400,
            },
            Dead: {},
            Hurt: {},
            Idle: {},
            Run: {},
            Walk: {},
        },
        sprites: {},
        attacks: [ 'Attack_1', 'Attack_2', 'Magic_1', 'Magic_2' ],
    },
    Skeleton: {
        height: 128,
        width: 128,
        states: {
            Attack_1: {
                time: 140,
                hit: 300,
            },
            Attack_2: {
                time: 140,
                hit: 400,
            },
            Attack_3: {
                time: 140,
                hit: 400,
            },
            Special_attack: {
                time: 140,
                hit: 400,
            },
            Dead: {},
            Hurt: {},
            Idle: {},
            Run: {},
            Walk: {},
        },
        sprites: {},
        attacks: [ 'Attack_1', 'Attack_2', 'Attack_3', 'Special_attack' ],
        offset: {
            y: 54,
            x: {
                left: 40,
                right: 34,
            }
        },
        scale: .9,
    },
    Fire_Spirit: {
        height: 128,
        width: 128,
        states: {
            Attack: {
                time: 140,
                hit: 300,
            },
            Charge: {
                time: 140,
                hit: 400,
            },
            Explosion: {
                time: 140,
                hit: 400,
            },
            Flame: {
                time: 140,
                hit: 400,
            },
            Shot: {
                time: 140,
                hit: 400,
            },
            Dead: {},
            Hurt: {},
            Idle: {},
            Run: {},
            Walk: {},
        },
        sprites: {},
        attacks: [ 'Attack', 'Charge', 'Explosion', 'Flame', 'Shot' ],
        offset: {
            y: 52,
            x: {
                left: 40,
                right: 42,
            }
        },
        scale: 1,
    },
    Plent: {
        height: 128,
        width: 128,
        states: {
            Attack_1: {
                time: 140,
                hit: 300,
            },
            Attack_2: {
                time: 140,
                hit: 400,
            },
            Attack_3: {
                time: 140,
                hit: 400,
            },
            Attack_Disguise: {
                time: 140,
                hit: 400,
            },
            Cloud_Poison: {
                time: 140,
                hit: 400,
            },
            Poison: {
                time: 140,
                hit: 400,
            },
            Dead: {},
            Hurt: {},
            Idle: {},
            Run: {},
            Walk: {},
        },
        sprites: {},
        attacks: [ 'Attack_1', 'Attack_2', 'Attack_3', 'Attack_Disguise', 'Cloud_Poison', 'Poison' ],
        offset: {
            y: 70,
            x: {
                left: 40,
                right: 40,
            }
        },
        scale: 1,
    }
};

export default function get_enemies_data(){
    return sprite_images_loader_2(data, 'sprites/enemies');
}