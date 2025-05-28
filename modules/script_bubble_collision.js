import { getRandom, getDistance, getRandomDirection } from "./utils.js";

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

// mouse object
let mouse = {
  x: undefined,
  y: undefined,
};

// mouse event listener
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Bubble {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: getRandomDirection(),
      y: getRandomDirection(),
    };
    this.mass = 1;
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

  updateBubble() {
    if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius <= 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.createBubble();
  }
}

// bubbleArray has all the bubbles stored
let bubbleArray = [];
// radius of a bubble
let radius = 32;
// n: number of bubbles
let n = 32;
// Random bubble location
let randomX = getRandom(radius, canvas.width - radius);
let randomY = getRandom(radius, canvas.height - radius);

// Pushing first bubble
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

// Function to check if two bubbles are colliding or not
const isColliding = (bubble, otherBubble) => {
  let distance = getDistance(bubble.x, bubble.y, otherBubble.x, otherBubble.y);
  return distance <= bubble.radius + otherBubble.radius;
};

// Function to check if two bubbles are overlapping or not
const isOverlapping = (bubble, otherBubble) => {
  let distance = getDistance(bubble.x, bubble.y, otherBubble.x, otherBubble.y);
  return distance - bubble.radius + otherBubble.radius < 0;
};

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  // clear canvas after every new frame
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // For each bubble in bubbleArray call updateBubble()
  bubbleArray.forEach((bubble) => {
    bubble.updateBubble();
  });
};

// Call animate()
animate();

// To-do:
// Add 2D-Newtonian Physics
// Add Colors
// Change colors wrt the mouse movements
// https://en.wikipedia.org/wiki/Elastic_collision
// Uniform Grid Spatial Positioning
