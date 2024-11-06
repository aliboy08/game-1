import { sprite_images_loader_2 } from 'lib/functions';

const data = {
    Samurai: {
        height: 128,
        width: 128,
        states: {
            Idle: {},
            Walk: {},
            Run: {},
            Jump: {},
            Shield: {},
            Attack_1: {},
            Attack_2: {
                time: 70,
            },
            Attack_3: {},
            Hurt: {},
            Dead: {},
        },
    },
    Shinobi: {
        height: 128,
        width: 128,
        states: {
            Idle: {},
            Walk: {},
            Run: {},
            Jump: {},
            Shield: {},
            Attack_1: {},
            Attack_2: {
                time: 80,
            },
            Attack_3: {},
            Hurt: {},
            Dead: {},
        },
    },
    Fighter: {
        height: 128,
        width: 128,
        states: {
            Idle: {},
            Walk: {},
            Run: {},
            Jump: {},
            Shield: {},
            Attack_1: {},
            Attack_2: {
                time: 80,
            },
            Attack_3: {
                time: 80,
            },
            Hurt: {},
            Dead: {},
        },
    }
};

export default function get_players_data(){
    return sprite_images_loader_2(data, 'public/sprites/player');
}