const sprites_data_effects = {
    lightning_orb: {
        img: new Image(),
        cols: 5,
        rows: 2,
        index: {
            col: 0,
            row: 0,
        },
        offset: {
            x: 40,
            y: 40,
        },
        animation_time: 60,
    },
    flame_impact: {
        img: new Image(),
        cols: 4,
        rows: 1,
        index: {
            col: 0,
            row: 0,
        },
        offset: {
            x: 70,
            y: 70,
        },
        animation_time: 60,
    }
}
sprites_data_effects.lightning_orb.img.src = '/src/sprites/effects/lightning_orb.png';
sprites_data_effects.flame_impact.img.src = '/src/sprites/effects/flame_impact.png';
