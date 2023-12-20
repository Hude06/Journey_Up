const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let blockSize = 32
let currentKey = new Map();
class Point {
	constructor(x,y) {
		this.x = x
		this.y = y
	}
}
class Rect {
	constructor(x,y,w,h) {
		this.w = w
		this.h = h
		this.x = x
		this.y = y
	}
	intersects(rect2) {
		let TL = new Point(this.x,this.y);
		let TR = new Point(this.x + this.w, this.y);
		let BL = new Point(this.x,this.y + this.h);
		let BR = new Point(this.x + this.w, this.y + this.h);
		if (rect2.contains(TL)) {
			return true
		} else if(rect2.contains(TR)) {
			return true
		} else if(rect2.contains(BL)) {
			return true
		} else if (rect2.contains(BR)) {
			return true
		} else {
			return false
		}
        
	}
	contains(pt) {
        if (pt.x < this.x)
        return false;
        if (pt.y < this.y)
        return false;
        if (pt.x > this.x + this.w)
        return false;
        if (pt.y > this.y + this.h)
        return false;
    return true;
	}
}
class Block {
    constructor(x,y,w,h) {
        this.bounds = new Rect(x*blockSize,y*blockSize,w*blockSize,h*blockSize)
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
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
        this.bounds = new Rect(200,50,70,70)
        this.velocity = 1;
        this.gravity = 0.2;
        this.speed = 7;

        this.grounded = false;
        this.image = new Image();
        this.image.src = "./Assets/Gray.png"
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        this.grounded = blocks.some(block => block.bounds.intersects(this.bounds) || this.bounds.intersects(block.bounds));
        console.log("Grounded", this.grounded);
    
        this.velocity += this.gravity;
        if (this.grounded) {
            this.velocity = 0;
            if (currentKey.get(" ")) {
                this.bounds.y -= 20;
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
let block2 = new Block(0,43,10,1)
let block1 = new Block(0,47,50,2)
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