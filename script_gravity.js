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
    c.strokeStyle = 'black';
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }

  addGravity() {
    // ball_height + radius + dy >= canvas_height
    // ball_height - radius <= 0
    if (
      this.y + this.radius + this.dy >= canvas.height ||
      this.y - this.radius <= 0
    ) {
      // Adding friction reduces height since dy is reduced
      this.dy = -this.dy * this.f;
    } else {
      // Adding gravity - if free falling then increase speed by g
      this.dy += this.g;
    }
    // Add speed
    this.y += this.dy;
    this.createBall();
  }
}

// Assigns random color
const assignRandomColor = () => {
  let colorArray = [
    "#10454F",
    "#506266",
    "#818274",
    "#A3AB78",
    "#BDE038",
    "#042940",
    "#005C53",
    "#9FC131",
    "#DBF227",
    "#D6D58E",
  ];
  let random = Math.floor(getRandom(0, colorArray.length));
  return colorArray[random];
};

let n = 16;
let ball;
let ballArray = [];
const startAngle = 0;
const endAngle = 2 * PI;

// init function to initialize Ball instance
const init = () => {
  for (let i = 0; i < n; i++) {
    let randomRadius = getRandom(32, 64);
    let randomColor = assignRandomColor();
    let randomX = getRandom(randomRadius, canvas.width - randomRadius);
    let randomY = getRandom(randomRadius, canvas.height / 4);
    let randomDY = getRandom(2, 3);
    let randomGravity = getRandom(0.1, 2);
    let randomFriction = getRandom(0.7, 0.99);

    ball = new Ball(
      randomX,
      randomY,
      randomDY,
      randomGravity,
      randomFriction,
      randomRadius,
      randomColor
    );
    ballArray.push(ball);
  }
};

init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].addGravity();
  }
};

// Call animate()
animate();
