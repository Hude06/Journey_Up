import { Rect } from "./RectUtils.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let blockSize = 32
let currentKey = new Map();
class Block {
    constructor(x,y,w,h) {
        this.bounds = new Rect(x*blockSize,y*blockSize,w*blockSize,h*blockSize)
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5;
        ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)

    }
    update() {
        if (player.bounds.intersects(this.bounds) || this.bounds.intersects(player.bounds)) {
            if (player.velocity > 0) {
                player.grounded = true;
                player.velocity = 0;
                player.bounds.y = this.bounds.y - player.bounds.h + 1;
                console.log("Intersecting");
            }
        }
    }
}
class Player {
    constructor() {
        this.bounds = new Rect(200,50,25,25)
        this.velocity = 1;
        this.gravity = 0.2;
        this.speed = 7;
        this.grounded = false;
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5;
        ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        this.grounded = blocks.some(block => block.bounds.intersects(this.bounds) || this.bounds.intersects(block.bounds));
        console.log("Grounded", this.grounded);
    
        this.velocity += this.gravity;
        if (this.grounded) {
            this.velocity = 0;
            if (currentKey.get(" ")) {
                this.bounds.y -= 50;
                this.velocity -= 10;
            }
        }
        this.bounds.y += this.velocity;
        if (currentKey.get("a")) {
            this.bounds.x -= this.speed;
        }
        if (currentKey.get("d")) {
            this.bounds.x += this.speed;
        }
    }
}
let block1 = new Block(0,48,50,2)
let block2 = new Block(0,38,10,2)
let player = new Player();
let blocks = [block1,block2]
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
    }
    player.update();
    player.draw();
    requestAnimationFrame(loop);
}
 
function init() {
    keyboardInit();
    loop();
}
init();