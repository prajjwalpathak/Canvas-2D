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

const getRandomDirection = () => {
  let speed = [2, -2];
  return speed[Math.floor(getRandom(0, 2))];
};

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};

class Bubble {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = getRandomDirection();
    this.dy = getRandomDirection();
    this.radius = radius;
    this.color = "#dddddd";
  }

  createBubble() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * PI, false);
    c.strokeStyle = "black";
    c.fillStyle = this.color;
    // c.fill();
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
let radius = 32;
let n = 32;
let randomX = getRandom(radius, canvas.width - radius);
let randomY = getRandom(radius, canvas.height - radius);
bubbleArray.push(new Bubble(randomX, randomY, radius));
const init = () => {
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < bubbleArray.length; j++) {
      if (
        getDistance(randomX, randomY, bubbleArray[j].x, bubbleArray[j].y) -
          2 * radius <=
        0
      ) {
        randomX = getRandom(radius, canvas.width - radius);
        randomY = getRandom(radius, canvas.height - radius);
        j = -1;
      }
    }
    bubbleArray.push(new Bubble(randomX, randomY, radius));
  }
  bubbleArray.forEach((bubble) => {
    bubble.createBubble();
  });
};

// Call init()
init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  bubbleArray.forEach((bubble) => {
    bubble.moveBubble();
  });
};

// Call animate()
animate();

// To-do:
// Add 2D-Newtonian Physics
// Add Colors
// Change colors wrt the mouse movements