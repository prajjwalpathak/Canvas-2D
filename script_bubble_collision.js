const PI = 22 / 7;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Random function
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

class Bubble {
  constructor(radius) {
    this.x = getRandom(radius, canvas.width - radius);
    this.y = getRandom(radius, canvas.height - radius);
    this.dx = 2;
    this.dy = 2;
    this.radius = radius;
    this.color = "black";
  }

  createBubble() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * PI, false);
    c.strokeStyle = "black";
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }

  moveBubble() {
    if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.createBubble();
  }
}

let bubbleArray = [];
let n = 10;
const init = () => {
  for (let i = 0; i < n; i++) {
    bubbleArray.push(new Bubble(32));
  }
  for (let i = 0; i < n; i++) {
    bubbleArray[i].createBubble();
  }
};

// Call init()
init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < n; i++) {
    bubbleArray[i].moveBubble();
  }
};

// Call animate()
animate();
