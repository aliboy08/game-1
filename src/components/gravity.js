const gravity = 8;

export function apply_gravity(objects, time){
    objects.forEach(object=>{
        object.velocity.y += gravity;
        object.position.y += object.velocity.y * time.seconds_passed;
    })
}