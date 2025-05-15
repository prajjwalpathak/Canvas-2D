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

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Your code
};

// Call animate()
animate();

class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  createBall() {
    const startAngle = 0;
    const endAngle = 2 * PI;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, startAngle, endAngle);
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
    c.fill();
    c.stroke();
  }
}

const init = () => {
  const ball = new Ball(100, 100, 100);
  ball.createBall();
};

init();
