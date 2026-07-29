// Mini game menggunakan p5.js
let player;
let gravity = 0.6;
let jumpForce = -12;
let obstacles = [];
let score = 0;

function setup(){
  let canvas = createCanvas(700, 360);
  canvas.parent('game-container');
  player = new Player();
  frameRate(60);
}

function draw(){
  background(13,17,23);
  fill(255);
  textSize(18);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 12, 12);

  player.update();
  player.show();

  // spawn obstacle setiap ~1.5 detik
  if(frameCount % 90 === 0){
    obstacles.push(new Obstacle());
  }

  for(let i = obstacles.length - 1; i >= 0; i--){
    obstacles[i].update();
    obstacles[i].show();

    if(obstacles[i].hits(player)){
      noLoop(); // stop game
    }

    if(obstacles[i].offscreen()){
      obstacles.splice(i,1);
      score++;
    }
  }
}

function keyPressed(){
  if(key === ' ' || keyCode === 32){
    if(!isLooping()){
      // restart
      obstacles = [];
      score = 0;
      loop();
    }
    player.jump();
  }
}

class Player{
  constructor(){
    this.r = 36;
    this.x = 64;
    this.y = height - this.r - 20;
    this.vy = 0;
  }
  jump(){
    if(this.y >= height - this.r - 20 - 1){
      this.vy = jumpForce;
    }
  }
  update(){
    this.y += this.vy;
    this.vy += gravity;
    if(this.y > height - this.r - 20){
      this.y = height - this.r - 20;
      this.vy = 0;
    }
  }
  show(){
    fill(80,200,120);
    rect(this.x, this.y, this.r, this.r, 6);
  }
}

class Obstacle{
  constructor(){
    this.w = random(24, 52);
    this.h = random(32, 80);
    this.x = width;
    this.y = height - this.h - 20;
    this.speed = 6;
  }
  update(){
    this.x -= this.speed;
  }
  show(){
    fill(200,80,80);
    rect(this.x, this.y, this.w, this.h, 6);
  }
  offscreen(){
    return this.x + this.w < 0;
  }
  hits(player){
    return (player.x < this.x + this.w && player.x + player.r > this.x && player.y < this.y + this.h && player.y + player.r > this.y);
  }
}