import { Rect } from "./RectUtils.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let blockSize = 32
let currentKey = new Map();
let grounded = false;
class Block {
    constructor(x,y,w,h) {
        this.bounds = new Rect(x*blockSize,y*blockSize,w*blockSize,h*blockSize)
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        if (player.bounds.intersects(this.bounds) || this.bounds.intersects(player.bounds)){
            grounded = true;
        } else {
            grounded = false;
        }
    }
}
class Player {
    constructor() {
        this.bounds = new Rect(200,50,25,25)
        this.velocity = 1;
        this.gravity = 0.2;
        this.speed = 7;
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        this.velocity += this.gravity;
        if (this.grounded) {
            this.velocity = 1;
            this.gravity = 0.2
            for (let i = 0; i < blocks.length; i++) {
                player.bounds.y = blocks[i].bounds.y - player.bounds.h
            }
        }
        this.bounds.y += this.velocity;
        if (currentKey.get("a")) {
            this.bounds.x -= this.speed;
        }
        if (currentKey.get("d")) {
            this.bounds.x += this.speed;
        }
        if (grounded) {
            if (currentKey.get(" ")) {
                this.bounds.y -= 25
                this.velocity -= 10
            }
        }
    }
}
function MakeBlock(x,y,w) {
    blocks.push(new Block(x,y,w,1));
}
let player = new Player();
let blocks = []
MakeBlock(0,44,10)
MakeBlock(0,49,50)
console.log(blocks)
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
      currentKey.set(event.key, true);
    });
    window.addEventListener("keyup", function (event) {
      currentKey.set(event.key, false);
    });
  }
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].draw();
        blocks[i].update();
        if (player.bounds.intersects(blocks[i].bounds) || blocks[i].bounds.intersects(player.bounds)) {
            player.grounded = true;
        } else {
            player.grounded = false;
        }
    }
    player.draw();
    player.update();
    requestAnimationFrame(loop);
}
 
function init() {
    keyboardInit();
    loop();
}
init();