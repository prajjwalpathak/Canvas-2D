let PI = 22 / 7;
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

let c = canvas.getContext("2d");

// Rectangle
// c.fillStyle = "rgb(0, 82, 171)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#990000";
// c.fillRect(200, 200, 400, 400);

// Line
// let x1 = 100;
// let y1 = 100;
// let x2 = 4 * x1;
// let y2 = y1;
// let x3 = x2;
// let y3 = 4 * y2;
// let x4 = x1;
// let y4 = y3;

// c.beginPath();
// c.moveTo(x1, y1);
// c.lineTo(x2, y2);
// c.lineTo(x3, y3);
// c.lineTo(x4, y4);
// c.closePath();
// c.strokeStyle = "lime";
// c.stroke();

// Arc

// const drawCircle = (x, y, radius) => {
//   c.beginPath();
//   c.arc(x, y, radius, 0, 2 * PI, false);
//   c.strokeStyle = "black";
//   c.stroke();
// };

// let randomX = Math.random() * canvas.width;
// let randomY = Math.random() * canvas.height;
// Draw random circles
// for (let i = 0; i < 5; i++) {
//   let randomX = Math.random() * canvas.width;
//   let randomY = Math.random() * canvas.height;
//   let randomRadius = Math.random() * 100;
//   drawCircle(randomX, randomY, randomRadius);
// }

// drawCircle(randomX, randomY, 100);

// Bouncing circle animation

// const getRandom = (min, max) => {
//   return Math.random() * (max - min) + min;
// };

// let radius = 50;
// let dx = 5;
// let dy = 5;
// let x = getRandom(radius, canvas.width - radius);
// let y = getRandom(radius, canvas.height - radius);

// const animate = () => {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   c.beginPath();
//   c.arc(x, y, radius, 0, 2 * PI, false);
//   c.strokeStyle = "black";
//   c.stroke();

//   if (x + radius > canvas.width || x - radius < 0) {
//     dx = -dx;
//   }

//   if (y + radius > canvas.height || y - radius < 0) {
//     dy = -dy;
//   }

//   x += dx;
//   y += dy;
// };

// animate();

// Random Bouncing Circles

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

    this.x += this.dx;
    this.y += this.dy;

    this.createCircle();
  }
}

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Creating Circle objects and storing it in an Array of objects
let n = 10;
let circleArray = [];
for (let i = 0; i < n; i++) {
  let randomRadius = getRandom(10, canvas.height / 4);
  let dx = getRandom(0, 5);
  let dy = getRandom(0, 5);
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
