const PI = 22 / 7;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth * 0.96;
  canvas.height = window.innerHeight * 0.96;
  init();
});

// Random function
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Ball class
class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
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
      this.dy = -this.dy;
    } else {
      this.dy += 2;
    }
    this.y += this.dy;

    this.createBall();
  }
}

let ball;
// init function to initialize Ball instance
const init = () => {
  ball = new Ball(canvas.width/2, canvas.height/4, 2, 100, "black");
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
