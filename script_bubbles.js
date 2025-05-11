let PI = 22 / 7;
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

let c = canvas.getContext("2d");

// mouse object to store mouse co-ordinates
let mouse = {
  x: undefined,
  y: undefined,
};

// Mouse event listener
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  createCircle() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * PI, false);
    c.strokeStyle = "black";
    c.fillStyle = "black";
    c.fill();
    c.stroke();
  }

  // Update Circle direction after collision
  updatecircle() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Collision Logic
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.radius < canvas.height / 8
    ) {
      this.radius += 2;
    } else if (this.radius > 10) {
      this.radius -= 2;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.createCircle();
  }
}

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Creating Circle objects and storing it in an Array of objects
let n = 256;
let circleArray = [];
for (let i = 0; i < n; i++) {
  let randomRadius = 10;
  let dx = getRandom(0, 3);
  let dy = getRandom(0, 3);
  let randomX = getRandom(randomRadius, canvas.width - randomRadius);
  let randomY = getRandom(randomRadius, canvas.height - randomRadius);
  circleArray.push(new Circle(randomX, randomY, randomRadius, dx, dy));
}

// Animate funtion for all Circle objects
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < n; i++) {
    circleArray[i].updatecircle();
  }
};

animate();
