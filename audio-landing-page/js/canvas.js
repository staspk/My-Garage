class Vector2 {
    constructor(x, y) { this.x = x; this.y = y; }
}
class Vector3 {
    constructor(x, y, z) { this.x = x; this.y = y; this.z = z; }
}

class StarField {
    constructor(canvas, ctx) {
        this.canvas = canvas; this.ctx = ctx;
        
        this.stars = [];
        this.amount = 0; this.speed = 100; this.maxDepth = 1000; this.maxSize = 3;

        this.fps = 0; this.fpsCount = 0; this.fpsTime = 0; this.lastFrame = 0;
        
        this.method = 'rects';
        
        this.origin = new Vector2(0,0);

        this.resetOrigin();
        this.stars.length - 0;
        this.initStars();
    }

    print(){
        console.log `Amount: ${this.stars}. Speed: ${this.speed}. MaxDepth: ${this.maxDepth}. MaxSize: ${this.maxSize}.`
        console.log `FPS: ${this.fps}. FpsCount: ${this.fpsCount}. FpsTime: ${this.fpsTime}. LastFrame: ${this.lastFrame}.`
        console.log `Origin: ${this.origin.x}, ${this.origin.y}`
    }

    initStars() {
        for (let i = 0; i < this.amount; i++) {
            this.stars.push(new Vector3(
                randomRange(-this.canvas.width, this.canvas.width),
                randomRange(1, this.maxDepth)
            ))
        }
    }

    update(time) {
        let deltaTime = (time - this.lastFrame)*0.001;
        this.updateStars(deltaTime);
        (this.method === 'rects') ? this.drawRects() : this.drawBuffer();
        this.lastFrame = time;
    }

    updateStars(deltaTime) {
        let distance = this.speed * deltaTime;

        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];
            star.z -= distance;
            if (star.z <= 0) {
                star.x = randomRange(-this.canvas.width, this.canvas.width);
                star.y = randomRange(-this.canvas.height, this.canvas.height);
                star.z = this.maxDepth;
            }
        }
    }

    drawRects() {
        this.ctx.fillStyle = 'rgb(204, 114, 234)';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];
            let k = 256 / star.z;
            let x = star.x*k + this.origin.x;
            let y = star.y*k + this.origin.y;
            let size = ((this.maxDepth-star.z)/this.maxDepth) * this.maxSize;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    drawBuffer() {
        let pos = 0, x, y;
        let length = this.im
    }


    resize(width, height) {
        this.canvas.width = width;  this.canvas.height = height;
        this.canvas.style.width = width + "px";  this.canvas.style.height = height + "px";

        this.img_data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.resetOrigin();
    }

    resetOrigin() {  this.origin.x = this.canvas.width / 2; this.origin.y = this.canvas.height; }
}
