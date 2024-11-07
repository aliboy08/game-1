(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))s(h);new MutationObserver(h=>{for(const a of h)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(h){const a={};return h.integrity&&(a.integrity=h.integrity),h.referrerPolicy&&(a.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?a.credentials="include":h.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(h){if(h.ep)return;h.ep=!0;const a=i(h);fetch(h.href,a)}})();function u(e){return{top:e.position.y,right:e.position.x+e.width,bottom:e.position.y+e.height,left:e.position.x,width:e.width,height:e.height}}function A(e,t){e.forEach((i,s)=>{i==t&&e.splice(s,1)})}function T(e,t){e.position.y=t.position.y-e.height,e.is_grounded=!0,e.velocity.y=0}function B(e,t){return g(e.bounds,t.bounds)}function g(e,t){if(e.top>t.bottom||e.bottom<t.top)return!1;const i=Math.abs(e.left-t.left),s=Math.abs(e.right-t.right);return e.right>t.left&&e.left<t.right&&i<s?"left":e.left<t.right&&e.right>t.left?"right":!1}function U(e){return j(1,101)<=e}function I(e){const t=G(e.length);return e[t]}function G(e){return Math.floor(Math.random()*e)}function j(e,t){const i=Math.ceil(e),s=Math.floor(t);return Math.floor(Math.random()*(s-i)+i)}function S(e){const t={frames_count:e.frames_count,max:{width:0,height:0},ready:!1};let i=0;const s=function(){this.width>t.max.width&&(t.max.width=this.width),this.height>t.max.height&&(t.max.height=this.height),i++,i===e.frames_count&&(t.ready=!0)};return typeof e.file_names<"u"?t.images=Q(e,s):t.images=V(e,s),t}function Q(e,t){const i=[];return e.file_names.forEach(s=>{const h=new Image;h.onload=t,h.src=e.base_image_path+s,i.push(h)}),i}function V(e,t){const i=[],s=e.image_extension??".png",h=e.image_index_start??1;let a=e.image_index_end??e.frames_count;typeof e.image_index_end>"u"&&(a=h+e.frames_count);for(let n=h;n<a;n++){let o=n;(e.leading_zero??!0)&&o<10&&(o="0"+o);const r=new Image;r.onload=t,r.src=e.base_image_path+o+s,i.push(r)}return i}function $(e,t,i="png"){for(const s in e){const h=e[s];for(const a in h.states){const n=h.states[a];n.name=a,n.index=0;const o=new Image;o.onload=function(){n.frames_count=o.width/h.width},o.src=`${t}/${s}/${a}.${i}`,n.img=o}}return e}function R(e,t){e[t].state=!0,clearTimeout(e[t].timer),e[t].timer=setTimeout(()=>{e[t].state=!1},e[t].time)}const X=48;class Y{constructor(t){this.width=t.width,this.height=X,this.position={x:0,y:t.height-this.height},this.img=new Image,this.img.src="sprites/environment/tile45.png",this.img.width=48,this.img.height=48,this.image_repeat_x=Math.round(this.width/this.img.width)}draw(t){for(let i=0;i<this.image_repeat_x;i++)t.drawImage(this.img,this.position.x+this.img.width*i,this.position.y)}collision(t){t.forEach(i=>{i.velocity.y<0||i.bounds.bottom>=this.position.y&&T(i,this)})}}const Z=8;function E(e,t){e.forEach(i=>{i.velocity.y+=Z,i.position.y+=i.velocity.y*t.seconds_passed})}const tt=35;class _{constructor(t){this.position={x:t.x??0,y:t.y??0},this.width=t.width??96,this.height=t.height??10,this.bounds=u(this);const i=new Image;i.src="sprites/environment/tile105.png",i.width=48,i.height=48,this.img=i,this.repeat_x=Math.round(this.width/this.img.width)}draw(t){for(let i=0;i<this.repeat_x;i++)t.drawImage(this.img,this.position.x+this.img.width*i,this.position.y-tt)}collision(t){t.forEach(i=>{i.velocity.y>0&&(i.bounds.right<this.bounds.left||i.bounds.left>this.bounds.right||i.bounds.bottom>this.bounds.top||i.position.y>=this.position.y-i.height&&T(i,this))})}}const v={health:{sprite:{img:new Image,width:32,height:32},effect:e=>{e.health.add(20)}},mana:{sprite:{img:new Image,width:32,height:32},effect:e=>{e.mana.add(30)}},powerup:{sprite:{img:new Image,width:32,height:32},effect:e=>{e.power_up.upgrade()}}};v.health.sprite.img.src="sprites/items/potions/Icon21.png";v.mana.sprite.img.src="sprites/items/potions/Icon9.png";v.powerup.sprite.img.src="sprites/items/potions/Icon43.png";class it{constructor(t,i={}){this.type=t??"health",this.effect=v[this.type].effect,this.sprite=v[this.type].sprite,this.width=this.sprite.width,this.height=this.sprite.height,this.position={x:i.x??0,y:i.y??0},this.velocity={x:0,y:0},this.bounds=u(this),this.looters=[]}update(t,i){this.bounds=u(this),this.check_collision()}draw(t){this.draw_image(t)}draw_image(t){this.looter||t.drawImage(this.sprite.img,this.position.x,this.position.y,this.width,this.height)}check_collision(){this.looter||this.looters.forEach(t=>{B(t,this)&&this.pick_up(t)})}pick_up(t){this.looter=t,typeof this.effect=="function"&&this.effect(t),this.remove()}remove(){typeof this.on_remove=="function"&&this.on_remove()}}const et=80,st=["health","mana","powerup"];class ht{constructor(t){this.stage=t}init_drop(t){if(t.init_loot||(t.init_loot=!0,!this.has_drop()))return;const i=I(st);t.on_death=()=>{const s=new it(i,t.position);s.looters=this.stage.players,this.stage.items.push(s)}}has_drop(){return U(et)}}const D=2;class at{constructor(t){this.width=t.width,this.height=t.height,this.players=[],this.enemies=[],this.items=[],this.floor=new Y(this),this.loot_system=new ht(this),this.init_platforms()}update(t,i){E(this.players,t),E(this.enemies,t),E(this.items,t),this.platforms.forEach(s=>{s.collision(this.players),s.collision(this.enemies),s.collision(this.items)}),this.floor.collision(this.players),this.floor.collision(this.enemies),this.floor.collision(this.items),this.apply_bounds(this.players),this.apply_bounds(this.enemies),this.enemies.forEach(s=>s.update(t,i)),this.players.forEach(s=>s.update(t,i)),this.items.forEach(s=>s.update(t,i))}draw(t){this.floor.draw(t),this.platforms.forEach(i=>{i.draw(t)}),this.enemies.forEach(i=>i.draw(t)),this.players.forEach(i=>i.draw(t)),this.items.forEach(i=>i.draw(t))}init_platforms(){const t=this.height-this.floor.height,i=this.width/2,s=this.width,h=t-100,a=t-180,n=t-260,o=t-360,r=48;this.platforms=[new _({x:0,y:h,width:r*2}),new _({x:i-r*2,y:h,width:r*4}),new _({x:s-r,y:h,width:r}),new _({x:200,y:a,width:r*4}),new _({x:i-r/2,y:a,width:r}),new _({x:s-340,y:a,width:r*4}),new _({x:80,y:n,width:r*2}),new _({x:i-r*2,y:n,width:r*4}),new _({x:s-160,y:n,width:r*2}),new _({x:0,y:o,width:r*2}),new _({x:i-r,y:o-60,width:r*2}),new _({x:s-r*2,y:o,width:r*2})]}apply_bounds(t){for(const i of t)i.position.x<=0?i.position.x=D:i.position.x+i.width>=this.width&&(i.position.x=this.width-i.width-D)}add_enemy(t){this.enemies.push(t),this.players.forEach(i=>{i.attacks.targets.push(t)})}}let nt=class{constructor(t){this.entity=t,this.entity.is_moving=!1,this.entity.is_jumping=!1,this.is_running=!1,this.toggle_run=!1}idle(){this.entity.state="Idle"}move_left(){this.entity.is_moving=!0,this.entity.state="Walk",this.entity.direction="left",this.entity.velocity.x=-this.entity.speed.move,this.entity.is_jumping&&(this.entity.state="Jump")}move_right(){this.entity.is_moving=!0,this.entity.state="Walk",this.entity.direction="right",this.entity.velocity.x=this.entity.speed.move,this.entity.is_jumping&&(this.entity.state="Jump")}jump(){this.entity.is_jumping||(this.entity.is_jumping=!0,this.entity.state="Jump",this.entity.velocity.y=-this.entity.jump_force,this.entity.is_grounded=!1)}jump_end(){this.entity.is_jumping=!1,this.entity.is_moving?this.entity.state="Walk":this.entity.state="Idle"}run_start(){this.toggle_run=!0}run_end(){this.toggle_run=!1,this.entity.is_moving&&(this.entity.state="Walk")}movement_end(){this.entity.velocity.x=0,this.entity.state="Idle",this.entity.is_moving=!1}stop(){this.movement_end()}check_run(){if(this.toggle_run){if(!this.entity.is_moving||this.is_running)return;this.is_running=!0,this.entity.state="Run",this.entity.direction=="right"?this.entity.velocity.x=this.entity.speed.run:this.entity.direction=="left"&&(this.entity.velocity.x=-this.entity.speed.run)}else{if(this.toggle_run=!1,this.is_running=!1,!this.entity.is_moving)return;this.entity.direction=="right"?this.entity.velocity.x=this.entity.speed.move:this.entity.direction=="left"&&(this.entity.velocity.x=-this.entity.speed.move)}}update(t){this.check_run(),this.entity.position.x+=this.entity.velocity.x*t.seconds_passed,this.check_jump_end()}check_jump_end(){this.entity.is_jumping&&this.entity.is_grounded&&this.jump_end()}};class rt{constructor(t){this.width=t.width??20,this.height=t.height??20,this.velocity=t.velocity??100,this.direction=t.direction??"right",this.direction=="left"&&(this.velocity=-this.velocity),this.distance={max:1e3,total:0},this.position_initial={x:t.position.x,y:t.position.y},this.position={x:t.position.x,y:t.position.y},this.bounds=u(this),this.sprite=t.sprite??null,this.is_done=!1}draw(t){this.is_done||this.sprite&&this.sprite.draw(t,this)}update(t){if(this.is_done)return;this.sprite&&this.sprite.update(t,this),this.bounds=u(this);let i=this.velocity*t.seconds_passed;this.position.x+=i,this.distance.total+=i,Math.abs(this.distance.total)>=this.distance.max&&this.end()}end(){this.is_done=!0}}class ot{constructor(t){this.frames_count=t.sprite.frames_count,this.images=t.sprite.images,this.width=t.sprite.max.width,this.height=t.sprite.max.height,this.scale=t.scale??1,this.animation_time=t.animation_time??60,this.animation_timer=0,this.position={x:0,y:0},this.image_index=0}update(t,i){this.position=i.position,!(t.previous<this.animation_timer+this.animation_time)&&(this.animation_timer=t.previous,this.image_index++,this.image_index==this.images.length&&(this.image_index=0))}draw(t,i){const s=this.images[this.image_index],h=-(this.width-s.width),a=-(this.height-s.height)/2,n=this.width,o=this.height,{x:r,y:c}=this.position,y=this.width*this.scale,P=this.height*this.scale;i.direction=="left"?(t.save(),t.scale(-1,1),t.drawImage(s,h,a,n,o,-r-y,c,y,P),t.restore()):t.drawImage(s,h,a,n,o,r,c,y,P)}}class M{constructor(t){this.frames_count=t.sprite.frames_count,this.images=t.sprite.images,this.width=t.sprite.max.width,this.height=t.sprite.max.height,this.scale=t.scale??1,this.animation_time=t.animation_time??60,this.animation_timer=0,this.image_index=0,this.animating=!1,this.direction=!1,this.target=null,this.offset=t.offset??{y:10,x:{left:0,right:-60}}}update(t){this.target&&(t.previous<this.animation_timer+this.animation_time||(this.animation_timer=t.previous,this.image_index++,this.image_index==this.images.length&&(this.image_index=0,this.on_complete())))}draw(t){if(!this.target)return;const i=this.images[this.image_index],s=-(this.width-i.width),h=-(this.height-i.height)/2,a=this.width,n=this.height;let{x:o,y:r}=this.target.position;this.direction=="left"?o-=this.target.width/2:o+=this.target.width/2,r+=this.offset.y,o+=this.offset.x[this.direction];const c=this.width*this.scale,y=this.height*this.scale;this.direction=="left"?(t.save(),t.scale(-1,1),t.drawImage(i,s,h,a,n,-o-c,r,c,y),t.restore()):t.drawImage(i,s,h,a,n,o,r,c,y)}animate(t,i){this.target=t,this.direction=i}on_complete(){this.target=null}}const W=5,ct=S({base_image_path:"sprites/effects/water_projectile/water1000",frames_count:20}),dt=S({base_image_path:"sprites/effects/hit_spark_2/8213_",frames_count:12,image_index_start:0,leading_zero:!1});class lt{constructor(t){this.player=t.player,this.velocity=t.velocity,this.items=[],this.targets=[],this.size=.13,this.hit_effect=new M({sprite:dt,scale:.15,animation_time:30,offset:{y:0,x:{left:0,right:-60}}})}fire(){let t=331*this.size,i=171*this.size,s=this.player.direction=="right"?this.player.bounds.right:this.player.bounds.left,h=this.player.position.y+this.player.height/2;h-=i/2,h-=10;const a=new rt({position:{x:s,y:h},width:t,height:i,velocity:this.velocity,direction:this.player.direction,sprite:new ot({sprite:ct,scale:this.size})});this.items.push(a)}update(t){this.hit_effect.update(t),this.items.length&&this.items.forEach(i=>{i.update(t),this.check_hit(i),i.is_done&&A(this.items,i)})}draw(t){this.hit_effect.draw(t),this.items.length&&this.items.forEach(i=>{i.draw(t)})}check_hit(t){if(!this.targets)return;const i=u(t);for(const s of this.targets){if(s.is_dead)continue;const h=g(i,s.bounds);h&&(s.is_hit=!0,s.hit(this.player.projectile_damage),this.hit_effect.animate(s,h),h=="right"?s.position.x+=W:s.position.x-=W,typeof t.end=="function"&&t.end())}}}const H={mana_cost:2},z=5,_t=S({base_image_path:"sprites/effects/hit_spark_2/8213_",frames_count:12,image_index_start:0,leading_zero:!1});let ut=class{constructor(t){this.player=t,this.player.on_action_complete(i=>{this.action=null}),this.action=null,this.animation_timer=0,this.targets=[],this.projectiles=new lt({player:this.player,velocity:300}),this.hit_effect=new M({sprite:_t,scale:.15,animation_time:30,offset:{y:0,x:{left:-20,right:-40}}}),this.cooldown={attack_1:!1,attack_2:!1,attack_3:!1},this.cooldown_time={attack_1:400,attack_2:400,attack_3:400}}attack(t){this.cooldown[t]||(this.set_cooldown(t),this[t](),this.check_hit())}attack_1(){this.player.action="Attack_1",this.action={name:this.player.action,position:{x:this.player.direction=="right"?this.player.bounds.right:this.player.bounds.left-this.player.width,y:this.player.bounds.top+20},width:28,height:10}}attack_2(){this.player.mana.current<H.mana_cost||(this.player.mana.reduce(H.mana_cost),this.player.action="Attack_2",this.action={name:this.player.action,position:{x:this.player.direction=="right"?this.player.bounds.right:this.player.bounds.left-this.player.width,y:this.player.bounds.top+20},width:28,height:10},this.projectiles.targets.length||(this.projectiles.targets=this.targets),this.projectiles.fire())}attack_3(){this.player.action="Attack_3",this.action={name:this.player.action,position:{x:this.player.direction=="right"?this.player.bounds.right:this.player.bounds.left-this.player.width,y:this.player.bounds.top+20},width:28,height:10}}update(t){this.projectiles.update(t),this.hit_effect.update(t)}draw(t){this.projectiles.draw(t),this.hit_effect.draw(t),this.action&&typeof this.action.draw=="function"&&this.action.draw(t)}check_hit(){if(!this.targets)return;const t=u(this.action);for(const i of this.targets){if(i.is_dead)continue;const s=g(t,i.bounds);s&&(i.hit(this.player.damage),this.hit_effect.animate(i,s),s=="right"?i.position.x-=z:i.position.x+=z)}}set_cooldown(t){this.cooldown[t]=!0,setTimeout(()=>{this.cooldown[t]=!1},this.cooldown_time[t])}};const x={P1:{KeyA:"move_left",KeyD:"move_right",KeyS:"crouch",Space:"jump",ShiftLeft:"run",KeyJ:"attack_1",KeyK:"attack_2",KeyL:"attack_3"},P2:{ArrowLeft:"move_left",ArrowRight:"move_right",ArrowDown:"crouch",ArrowUp:"jump",NumpadEnter:"run",Numpad1:"attack_1",Numpad2:"attack_2",Numpad3:"attack_3"}};class mt{constructor(t){this.player=t,this.pressing={forward:!1,backward:!1},document.addEventListener("keydown",i=>{x[t.id][i.code]&&(t.is_dead||this[x[t.id][i.code]]())}),document.addEventListener("keyup",i=>{x[t.id][i.code]&&(t.is_dead||this.action_end(x[t.id][i.code]))})}move_left(){this.pressing.left=!0,this.player.movement.move_left()}move_right(){this.pressing.right=!0,this.player.movement.move_right()}crouch(){}jump(){this.player.movement.jump()}run(){this.player.movement.run_start()}attack_1(){this.player.attacks.attack("attack_1")}attack_2(){this.player.attacks.attack("attack_2")}attack_3(){this.player.attacks.attack("attack_3")}action_end(t){t=="move_right"&&(this.pressing.right=!1,this.pressing.left?this.move_left():this.player.movement.movement_end()),t=="move_left"&&(this.pressing.left=!1,this.pressing.right?this.move_right():this.player.movement.movement_end()),t=="run"&&this.player.movement.run_end()}}class ft{constructor(t){this.entity=t,this.position={x:10,y:10},this.init()}init(){this.init_portrait(),this.init_health(),this.init_mana()}draw(t){this.portrait.draw(t),this.health.draw(t),this.mana.draw(t)}update(){}init_portrait(){let s=this.position.x+8+5,h=this.position.y+16/2+5;const a=16*2;this.portrait={radius:16,diameter:a,x:s,y:h},this.portrait.draw=n=>{n.save(),n.beginPath(),n.arc(s,h,16,0,Math.PI*2,!0),n.fillStyle="orange",n.fill(),n.restore(),n.save(),n.font="bold 15px sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillStyle="black",n.fillText(this.entity.id,s,h),n.restore()}}init_health(){const h=this.portrait.x+this.portrait.radius+8,a=this.portrait.y-this.portrait.radius/2,n="#F95454";this.health={x:h,y:a,width:200,height:6},this.health.draw=o=>{this.draw_bar(o,n,h,a,200,6,this.entity.health.percent)}}init_mana(){const h=this.health.x,a=this.health.y+this.health.height+5,n="#77CDFF";this.mana={x:h,y:a,width:200,height:6},this.mana.draw=o=>{this.draw_bar(o,n,h,a,200,6,this.entity.mana.percent)}}draw_bar(t,i,s,h,a,n,o){t.save(),t.strokeStyle=i,t.fillStyle=i,t.strokeRect(s,h,a,n),t.fillRect(s,h,a*o,n),t.restore()}}const pt=4e3,gt=1;class yt{constructor(t){this.max=t,this.current=t,this.percent=1}add(t){this.current+=t,this.limit_max(),this.update_percent()}reduce(t){this.current-=t,this.update_percent()}update_percent(){this.percent=this.current/this.max}limit_max(){this.current>this.max&&(this.current=this.max)}init_regen(){setInterval(()=>{this.add(gt)},pt)}}const wt=4e3,vt=1;class C{constructor(t){this.max=t,this.current=t,this.percent=1}add(t){this.current+=t,this.limit_max(),this.update_percent()}reduce(t){this.current-=t,this.current<=0&&(this.current=0,typeof this.on_zero=="function"&&this.on_zero()),this.update_percent()}update_percent(){this.percent=this.current/this.max}limit_min(){this.current>this.max&&(this.current=this.max)}limit_max(){this.current>this.max&&(this.current=this.max)}init_regen(){setInterval(()=>{this.add(vt)},wt)}}class kt{constructor(t){this.player=t,t.power=1}upgrade(){this.player.power++,this.increase_damage(),this.increase_projectile_speed(),this.increase_projectile_size()}increase_damage(){this.player.damage+=.2,this.player.projectile_damage++}increase_projectile_speed(){this.player.attacks.projectiles.velocity+=50}increase_projectile_size(){this.player.attacks.projectiles.size+=.05}}const xt={Samurai:{height:128,width:128,states:{Idle:{},Walk:{},Run:{},Jump:{},Shield:{},Attack_1:{},Attack_2:{time:70},Attack_3:{},Hurt:{},Dead:{}}},Shinobi:{height:128,width:128,states:{Idle:{},Walk:{},Run:{},Jump:{},Shield:{},Attack_1:{},Attack_2:{time:80},Attack_3:{},Hurt:{},Dead:{}}},Fighter:{height:128,width:128,states:{Idle:{},Walk:{},Run:{},Jump:{},Shield:{},Attack_1:{},Attack_2:{time:80},Attack_3:{time:80},Hurt:{},Dead:{}}}};function bt(){return $(xt,"sprites/player")}const At=bt();class K{constructor(t){this.id=t.id??"P",this.model=t.model??"Samurai",this.init_sprite_data(),this.width=t.width??26,this.height=t.height??74,this.position={x:t.x??0,y:t.y??0},this.bounds=u(this),this.direction=t.direction??"right",this.speed={move:200,run:400},this.velocity={x:0,y:0},this.jump_force=500,this.animation_timer=0,this.state="Idle",this.action=null,this.action_complete=!0,this.is_dead=!1,this.is_hit=!1,this.with_collision=!0,this.movement=new nt(this),this.controls=new mt(this),this.attacks=new ut(this),this.health=new C(50),this.health.on_zero=()=>{this.dead()},this.mana=new yt(50),this.mana.init_regen(),this.damage=1,this.projectile_damage=1,this.power_up=new kt(this),this.status=new ft(this),this.targets=[]}update(t,i){this.bounds=u(this),this.update_sprite(t),this.movement.update(t),this.attacks.update(t,i),this.status&&this.status.update(),this.health_bar&&this.health_bar.update()}draw(t){this.draw_sprite(t),this.attacks.draw(t),this.status&&this.status.draw(t),this.health_bar&&this.health_bar.draw(t)}draw_sprite(t){const i=this.get_sprite(),{width:s,height:h,scale:a}=this.data;let n=s*i.index,o=0,{x:r,y:c}=this.position;r-=this.data.offset.x[this.direction],c-=this.data.offset.y,this.direction==="left"?(t.save(),t.scale(-1,1),t.drawImage(i.img,n,o,s,h,-r-s*a,c,s*a,h*a),t.restore()):t.drawImage(i.img,n,o,s,h,r,c,s*a,h*a)}update_sprite(t){const i=this.get_sprite();if(!(t.previous<this.animation_timer+i.time)&&(this.animation_timer=t.previous,i.index++,i.index==i.frames_count)){if(i.name==="Dead"){i.index--,this.after_death_animation();return}i.index=0,this.action&&(typeof this.action_complete=="function"&&this.action_complete(this.action),this.on_action_animation_complete(),this.action=null)}}on_action_complete(t){this.action_complete=t}on_action_animation_complete(){this.action=="Hurt"&&(this.is_hit=!1)}dead(){this.is_dead=!0,this.state="Dead",this.with_collision=!1,this.velocity.x=0,this.is_moving=!1}hit(t){this.is_dead||(this.is_hit=!0,this.action="Hurt",this.health.reduce(t))}after_death_animation(){}init_sprite_data(){this.data=At[this.model],this.data.scale=this.data.scale??1,typeof this.data.offset>"u"&&(this.data.offset={y:50,x:{left:52,right:50}});for(const t in this.data.states){const i=this.data.states[t];typeof i.time>"u"&&(i.time=100)}}get_sprite(){return this.data.states[this.action||this.state]}}class It{constructor(t){this.entity=t,this.entity.is_moving=!1,this.is_running=!1}move_left(){this.entity.is_moving=!0,this.entity.direction="left",this.entity.state=this.is_running?"Run":"Walk",this.entity.velocity.x=-this.entity.speed[this.is_running?"run":"move"]}move_right(){this.entity.is_moving=!0,this.entity.direction="right",this.entity.state=this.is_running?"Run":"Walk",this.entity.velocity.x=this.entity.speed[this.is_running?"run":"move"]}run_start(){this.is_running=!0}run_end(){this.is_running=!1}movement_end(){this.entity.velocity.x=0,this.entity.state="Idle",this.entity.is_moving=!1}stop(){this.movement_end()}update(t){this.entity.position.x+=this.entity.velocity.x*t.seconds_passed}}const F=5,St=S({base_image_path:"sprites/effects/hit_spark_1/8200_",frames_count:12,image_index_start:0,leading_zero:!1});class Et{constructor(t){this.entity=t,this.entity.on_action_complete(i=>{this.action=null}),this.action=null,this.animation_timer=0,this.attack_ready=!0,this.attack_interval=1e3,this.hit_effect=new M({sprite:St,scale:.15,animation_time:30,offset:{y:20,x:{left:-30,right:-40}}}),this.cooldown=!1,this.cooldown_time=1200}attack(){this.entity.before_attack_prevent()||this.cooldown||this.entity.stagger.state||(this.set_cooldown(),this.attack_1(),this.entity.after_attack())}attack_1(){this.entity.action=I(this.entity.data.attacks);const i=this.entity.get_sprite().hit??0;setTimeout(()=>{if(this.entity.stagger.state)return;const s=20,h=20;this.action={name:this.entity.action,position:{x:this.entity.direction=="right"?this.entity.bounds.right:this.entity.bounds.left-s,y:this.entity.bounds.top+20},width:s,height:h},this.check_hit()},i)}update(t){this.hit_effect.update(t)}draw(t){this.hit_effect.draw(t),this.action&&typeof this.action.draw=="function"&&this.action.draw(t)}check_hit(){if(!this.entity.targets)return;const t=u(this.action);for(const i of this.entity.targets){if(i.is_dead)continue;const s=g(t,i.bounds);s&&(i.hit(this.entity.damage),this.hit_effect.animate(i,s),s=="right"?i.position.x-=F:i.position.x+=F)}}set_cooldown(){this.cooldown=!0,setTimeout(()=>{this.cooldown=!1},this.cooldown_time)}}class jt{constructor(t){this.entity=t,this.width=30,this.height=3,this.position={x:0,y:0}}draw(t){this.entity.is_dead||(t.save(),t.strokeStyle="maroon",t.fillStyle="maroon",t.strokeRect(this.position.x,this.position.y,this.width,this.height),t.fillRect(this.position.x,this.position.y,this.width*this.entity.health.percent,this.height),t.restore())}update(){this.position={x:this.entity.position.x+this.entity.width/2-this.width/2,y:this.entity.position.y-10}}}class Mt{constructor(t){this.entity=t,this.last_x=null,this.distance=null,this.threshold=5,this.pause=!1,this.pause_duration=1e3}update(){this.check_toggle()}check_toggle(){this.last_x===null&&(this.last_x=this.entity.position.x),!this.pause&&this.distance!==null&&this.distance<this.threshold&&(this.entity.direction==="right"?this.entity.movement.move_left():this.entity.movement.move_right(),this.pause=!0,setTimeout(()=>{this.pause=!1},this.pause_duration))}check_distance(){setInterval(()=>{this.distance=Math.abs(Math.abs(this.entity.position.x)-Math.abs(this.last_x)),this.last_x=null},1e3)}}const Pt=["left","right"];class Rt{constructor(t){this.entity=t,this.start_x=0,this.distance=0,this.range=200,this.pause_duration=2e3,this.state=null,this.toggle_direction=new Mt(t),this.toggle_direction.check_distance(),this.start_delay=1e3,this.start_timeout=null,this.start()}update(){this.state=="start"&&(this.check_distance(),this.toggle_direction.update())}start(){clearTimeout(this.start_timeout),this.start_timeout=setTimeout(()=>{this.state="start",this.entity.movement.run_end(),I(Pt)==="right"?this.entity.movement.move_right():this.entity.movement.move_left()},this.start_delay)}pause(){this.stop(),this.state="pause",setTimeout(()=>{this.start()},this.pause_duration)}stop(){this.state="stop",this.entity.movement.movement_end(),this.distance=0,this.start_x=this.entity.position.x}check_distance(){this.distance=Math.abs(this.start_x-this.entity.position.x),this.distance>=this.range&&this.pause()}}class Dt{constructor(t){this.entity=t,this.range=360,this.current_target=null}update(){this.check_range()}draw(t){}get_bounds(){let{x:t,y:i}=this.entity.position;const s=this.range;t=t-s/2+this.entity.width/2;const h=this.entity.height,a=i,n=t+s,o=i+h;return{top:a,right:n,bottom:o,left:t,x:t,y:i,width:s,height:h}}check_range(){const t=this.get_bounds();let i=!1;this.entity.targets.forEach(s=>{if(s.is_dead||i)return;const h=g(t,s.bounds);if(!h){this.unset_target();return}this.set_target(s),this.chase_target(h),i=h})}set_target(t){this.current_target||(this.current_target=t,this.entity.current_target=t,typeof this.on_target_set=="function"&&this.on_target_set())}unset_target(){this.current_target&&(this.current_target=null,this.entity.current_target=null,typeof this.on_target_unset=="function"&&this.on_target_unset(),this.stop_chase())}chase_target(t){this.entity.pause.state||this.current_target&&(this.entity.direction=t,t==="left"?this.entity.movement.move_left():t==="right"&&this.entity.movement.move_right(),this.entity.movement.run_start())}stop_chase(){this.entity.movement.movement_end()}}class Wt{constructor(t){this.entity=t,this.range=70}update(){this.check_range()}draw(t){}get_bounds(){let{x:t,y:i}=this.entity.position;const s=this.range;t=t-s/2+this.entity.width/2;const h=this.entity.height,a=i,n=t+s,o=i+h;return{top:a,right:n,bottom:o,left:t,x:t,y:i,width:s,height:h}}check_range(){if(!this.entity.current_target)return;const t=this.entity.current_target;g(this.get_bounds(),t.bounds)&&this.on_range()}on_range(){this.entity.movement.movement_end(),this.entity.attacks.attack()}}class Ht{constructor(t){this.entity=t,this.target=new Dt(t),this.roam=new Rt(t),this.attack=new Wt(t),this.target.on_target_set=()=>{this.roam.stop()},this.target.on_target_unset=()=>{this.roam.start()}}update(t,i){this.entity.is_dead||(this.target.update(),this.roam.update(),this.attack.update())}draw(t){this.entity.is_dead||(this.target.draw(t),this.attack.draw(t))}}const zt={Orc_Warrior:{height:96,width:96,states:{Attack_1:{time:140,hit:400},Attack_2:{time:140,hit:400},Attack_3:{time:140,hit:400},Run_Attack:{time:140,hit:400},Dead:{},Hurt:{},Idle:{},Run:{},Walk:{}},sprites:{},attacks:["Attack_1","Attack_2","Attack_3","Run_Attack"]},Orc_Berserk:{height:96,width:96,states:{Attack_1:{time:140,hit:300},Attack_2:{time:140,hit:400},Attack_3:{time:140,hit:400},Run_Attack:{time:140,hit:400},Dead:{},Hurt:{},Idle:{},Run:{},Walk:{}},sprites:{},attacks:["Attack_1","Attack_2","Attack_3","Run_Attack"]},Orc_Shaman:{height:96,width:96,states:{Attack_1:{time:140,hit:300},Attack_2:{time:140,hit:400},Magic_1:{time:140,hit:400},Magic_2:{time:140,hit:400},Dead:{},Hurt:{},Idle:{},Run:{},Walk:{}},sprites:{},attacks:["Attack_1","Attack_2","Magic_1","Magic_2"]},Skeleton:{height:128,width:128,states:{Attack_1:{time:140,hit:300},Attack_2:{time:140,hit:400},Attack_3:{time:140,hit:400},Special_attack:{time:140,hit:400},Dead:{},Hurt:{},Idle:{},Run:{},Walk:{}},sprites:{},attacks:["Attack_1","Attack_2","Attack_3","Special_attack"],offset:{y:54,x:{left:40,right:34}},scale:.9},Fire_Spirit:{height:128,width:128,states:{Attack:{time:140,hit:300},Charge:{time:140,hit:400},Explosion:{time:140,hit:400},Flame:{time:140,hit:400},Shot:{time:140,hit:400},Dead:{},Hurt:{},Idle:{},Run:{},Walk:{}},sprites:{},attacks:["Attack","Charge","Explosion","Flame","Shot"],offset:{y:52,x:{left:40,right:42}},scale:1},Plent:{height:128,width:128,states:{Attack_1:{time:140,hit:300},Attack_2:{time:140,hit:400},Attack_3:{time:140,hit:400},Attack_Disguise:{time:140,hit:400},Cloud_Poison:{time:140,hit:400},Poison:{time:140,hit:400},Dead:{},Hurt:{},Idle:{},Run:{},Walk:{}},sprites:{},attacks:["Attack_1","Attack_2","Attack_3","Attack_Disguise","Cloud_Poison","Poison"],offset:{y:70,x:{left:40,right:40}},scale:1}};function Ft(){return $(zt,"sprites/enemies")}const Ot=Ft();class J{constructor(t){this.model=t.model??"Orc_Warrior",this.init_sprite_data(),this.direction=t.direction??"left",this.width=t.width??42,this.height=t.height??60,this.position={x:t.x??0,y:t.y??0},this.bounds=u(this),this.speed={move:50,run:150},this.velocity={x:0,y:0},this.jump_force=500,this.state="Idle",this.action=null,this.action_complete=!0,this.animation_timer=0,this.is_dead=!1,this.is_hit=!1,this.with_collision=!0,this.stagger={state:!1,time:200,timer:null},this.pause={state:!1,time:800,timer:null},this.health=new C(10),this.health.on_zero=()=>{this.dead()},this.health_bar=new jt(this),this.damage=1,this.movement=new It(this),this.attacks=new Et(this),this.targets=[],this.current_target=null,(t.ai??!0)&&(this.ai=new Ht(this))}update(t,i){if(this.bounds=u(this),this.update_sprite(t),this.is_dead){this.state="Dead";return}this.stagger.state||this.pause.state||(this.movement.update(t),this.attacks.update(t,i),this.ai&&this.ai.update(t,i),this.health_bar&&this.health_bar.update())}draw(t){this.draw_sprite(t),!this.is_dead&&(this.attacks.draw(t),this.ai&&this.ai.draw(t),this.health_bar&&this.health_bar.draw(t))}draw_sprite(t){const i=this.get_sprite(),{width:s,height:h,scale:a}=this.data;let n=s*i.index,o=0,{x:r,y:c}=this.position;r-=this.data.offset.x[this.direction],c-=this.data.offset.y,this.direction==="left"?(t.save(),t.scale(-1,1),t.drawImage(i.img,n,o,s,h,-r-s*a,c,s*a,h*a),t.restore()):t.drawImage(i.img,n,o,s,h,r,c,s*a,h*a)}update_sprite(t){const i=this.get_sprite();if(!(t.previous<this.animation_timer+i.time)&&(this.animation_timer=t.previous,i.index++,i.index===i.frames_count)){if(i.name==="Dead"){i.index--,this.after_death_animation();return}i.index=0,this.action&&(typeof this.action_complete=="function"&&this.action_complete(this.action),this.on_action_animation_complete(),this.action=null)}}on_action_complete(t){this.action_complete=t}on_action_animation_complete(){this.action==="Hurt"&&(this.is_hit=!1)}before_attack_prevent(){return!!(this.stagger.state||this.pause.state)}after_attack(){R(this,"pause")}hit(t){this.is_dead||(this.is_hit=!0,this.action="Hurt",this.health.reduce(t),R(this,"stagger"))}dead(){this.state="Dead",this.with_collision=!1,this.is_dead=!0,this.velocity.x=0,this.is_moving=!1,typeof this.on_death=="function"&&this.on_death()}after_death_animation(){setTimeout(()=>this.remove(),2e3)}remove(){typeof this.on_remove=="function"&&this.on_remove()}init_sprite_data(){this.data=Ot[this.model],this.data.scale=this.data.scale??1,typeof this.data.offset>"u"&&(this.data.offset={y:36,x:{left:36,right:20}});for(const t in this.data.states){const i=this.data.states[t];typeof i.time>"u"&&(i.time=100)}}get_sprite(){return this.data.states[this.action||this.state]}}const Lt=.05;function Tt(e){for(const t of e)if(t.with_collision&&!t.is_dead)for(const i of e){if(t==i||!i.with_collision||i.is_dead)continue;const s=g(t.bounds,i.bounds);if(!s)continue;const h=i.width*Lt;s=="right"?i.is_immovable?O(t,i):(t.position.x+=h,i.position.x-=h):s=="left"&&(i.is_immovable?O(t,i):(t.position.x-=h,i.position.x+=h))}}function O(e,t){e.velocity.y<0||(e.position.x=t.bounds.right,e.movement.stop())}const L={players:!1,enemies:!1},b={previous:0,seconds_passed:0};let l,p,m,f,d,w=[],k=[];function $t(){Qt(),Ct(),requestAnimationFrame(q)}window.addEventListener("load",$t);function Ct(){m=new at(l),Kt(),Bt(),Jt(),qt(),Yt()}function Kt(){f=new K({id:"P1",model:"Fighter",x:20,y:l.height}),m.players.push(f)}function Jt(){w=[new J({model:"Orc_Warrior",x:300,y:l.height})],m.enemies=w,w.forEach(e=>N(e)),setInterval(()=>Nt(),4e3)}function Nt(){const e=new J({model:I(["Orc_Warrior","Orc_Berserk","Orc_Shaman","Skeleton","Fire_Spirit","Plent"]),x:j(10,l.width-10),y:j(0,l.height-200)});N(e)}function N(e){w.push(e),m.loot_system.init_drop(e),k.push(e),f.attacks.targets.push(e),e.targets.push(f),typeof d<"u"&&!d.is_dead&&(d.attacks.targets.push(e),e.targets.push(d)),Gt(e)}function qt(){k.push(f),k.push(...w)}function Bt(){d=new K({id:"P2",model:"Samurai",direction:"left",x:l.width-50,y:l.height}),m.players.push(d),k.push(d),f.attacks.targets.push(d),d.attacks.targets.push(f),d.status.position.x=m.width-250,d.status.init()}function Ut(){for(const e in L)L[e]&&m[e].forEach(t=>{t.debugger&&t.debugger.draw(p)})}function Gt(e){e.on_remove=()=>{A(w,e),A(f.attacks.targets,e),typeof d<"u"&&A(d.attacks.targets,e)}}function Qt(){l=document.querySelector("canvas"),l.width=1200,l.height=600,p=l.getContext("2d"),p.strokeStyle="green",p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="high"}function q(e){b.seconds_passed=(e-b.previous)/1e3,b.previous=e,requestAnimationFrame(q),Vt(b),Xt(p)}function Vt(e){m.update(e,p),Tt(k)}function Xt(e){e.clearRect(0,0,l.width,l.height),m.draw(e),Ut()}function Yt(){window.addEventListener("gamepadconnected",e=>{console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",e.gamepad.index,e.gamepad.id,e.gamepad.buttons.length,e.gamepad.axes.length),gamepad_ready=!0})}