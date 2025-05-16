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
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
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
    if(this.y < canvas.height) {
      this.y += 1;
    }
    else if(this.y < canvas.height) {
      this.y -= 1;
    }
    this.createBall();
  }
}

let ball;
// init function to initialize Ball instance
const init = () => {
  ball = new Ball(600, 200, 100, "black");
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
