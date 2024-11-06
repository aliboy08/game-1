export const gravity = 8;

export function apply_gravity(entities, time){    
    entities.forEach(entity=>{
        entity.velocity.y += gravity;
        entity.position.y += entity.velocity.y * time.seconds_passed;
    })
}