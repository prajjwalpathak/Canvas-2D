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
  bubbleArray = [];
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

// Separate Bubbles
const separateBubbles = (bubble, otherBubble) => {
  const dx = otherBubble.x - bubble.x;
  const dy = otherBubble.y - bubble.y;
  const distance = Math.hypot(dx, dy);
  const overlap = bubble.radius + otherBubble.radius - distance;

  if (overlap > 0) {
    const nx = dx / distance; // direction from bubble to otherBubble
    const ny = dy / distance;

    const totalMass = bubble.mass + otherBubble.mass;
    const d1 = (overlap * otherBubble.mass) / totalMass;
    const d2 = (overlap * bubble.mass) / totalMass;

    // Push them apart proportionally
    bubble.x -= nx * d1;
    bubble.y -= ny * d1;
    otherBubble.x += nx * d2;
    otherBubble.y += ny * d2;
  }
};

// Resolve Collision
const resolveCollision = (bubble, otherBubble) => {
  let dx = otherBubble.x - bubble.x;
  let dy = otherBubble.y - bubble.y;
  let distance = Math.hypot(dx, dy); // same as getDistance
  let nx = dx / distance; // normal vector
  let ny = dy / distance; // normal vector

  let relativeVelocityX = bubble.velocity.x - otherBubble.velocity.x;
  let relativeVelocityY = bubble.velocity.y - otherBubble.velocity.y;

  // This is a dot product. It tells us how much of their motion is toward (or away from) each other
  // If velocityAlongNormal > 0, they’re moving apart, so we skip
  let velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

  if (velocityAlongNormal > 0) return; // already separating

  // This tells you how strongly to push the two objects apart
  let impulse = (2 * velocityAlongNormal) / (bubble.mass + otherBubble.mass);

  bubble.velocity.x -= impulse * otherBubble.mass * nx;
  bubble.velocity.y -= impulse * otherBubble.mass * ny;
  otherBubble.velocity.x += impulse * bubble.mass * nx;
  otherBubble.velocity.y += impulse * bubble.mass * ny;
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

  for (let i = 0; i < bubbleArray.length; i++) {
    for (let j = i + 1; j < bubbleArray.length; j++) {
      let bubble = bubbleArray[i];
      let otherBubble = bubbleArray[j];

      if (isColliding(bubble, otherBubble)) {
        separateBubbles(bubble, otherBubble);
        resolveCollision(bubble, otherBubble);
      }
    }
  }
};

// Call animate()
animate();

// To-do:
// Add 2D-Newtonian Physics
// Add Colors
// Change colors wrt the mouse movements
// https://en.wikipedia.org/wiki/Elastic_collision
// Uniform Grid Spatial Positioning
