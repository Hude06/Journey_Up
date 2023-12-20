import { Rect } from "./RectUtils.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let blockSize = 32
let currentKey = new Map();
class Block {
    constructor(x,y,w,h) {
        this.bounds = new Rect(x*blockSize,y*blockSize,h*blockSize,w*blockSize)
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        if (player.bounds.intersects(this.bounds) || this.bounds.intersects(player.bounds)) {
            player.bounds.y = this.bounds.y-player.bounds.h
            player.grounded = true;
        } else {
            player.grounded = false;
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
    }
    update() {
        this.velocity += this.gravity;
        if (this.grounded) {
            this.velocity = 1;
            this.gravity = 0.2
        }
        this.bounds.y += this.velocity;
        if (currentKey.get("a")) {
            this.bounds.x -= this.speed;
        }
        if (currentKey.get("d")) {
            this.bounds.x += this.speed;
        }
        if (this.grounded) {
            if (currentKey.get(" ")) {
                this.bounds.y -= 10
                this.velocity -= 10
            }
        }
    }
}
let block1 = new Block(10,45,2,10)
let player = new Player();
let blocks = [block1]
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
    player.draw();
    player.update();
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].draw();
        blocks[i].update();
    }
    requestAnimationFrame(loop);
}
 
function init() {
    keyboardInit();
    loop();
}
init();