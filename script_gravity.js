const PI = 22 / 7;
const CANVAS_WIDTH = window.innerWidth * 0.96;
const CANVAS_HEIGHT = window.innerHeight * 0.96;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  init();
});

// Random function
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Ball class
class Ball {
  constructor(x, y, dy, g, f, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.g = g;
    this.f = f;
    this.radius = radius;
    this.color = color;
  }

  // function to create ball
  createBall() {
    const startAngle = 0;
    const endAngle = 2 * PI;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, startAngle, endAngle);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }

  motionBall() {
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy * this.f;
    } else {
      this.dy += this.g;
    }
    this.y += this.dy;

    this.createBall();
  }
}

let ball;
// init function to initialize Ball instance
const init = () => {
  ball = new Ball(canvas.width / 2, canvas.height / 4, 2, 1, 0.9, 100, "black");
  ball.createBall();
};

// Call init()
init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  ball.motionBall();
};

// Call animate()
animate();
