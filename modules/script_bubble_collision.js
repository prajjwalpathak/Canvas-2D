import { getRandom, getDistance, getRandomDirection } from "./utils.js";

const PI = 22 / 7;
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Bubble
let bubbleConfig = {
  n: 128,
  radius:
    Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 80,
};

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

// Collision Detection
const isColliding = (bubble, otherBubble) => {
  let distance = getDistance(bubble.x, bubble.y, otherBubble.x, otherBubble.y);
  return distance <= bubble.radius + otherBubble.radius;
};

// Rotate Function
const rotate = (velocity, angle) => {
  let rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };
  return rotatedVelocities;
};

// Collision Resolution
const resolveCollision = (bubble, otherBubble) => {
  let xVelocityDiff = bubble.velocity.x - otherBubble.velocity.x;
  let yVelocityDiff = bubble.velocity.y - otherBubble.velocity.y;

  let xDistance = otherBubble.x - bubble.x;
  let yDistance = otherBubble.y - bubble.y;

  // prevent accidental overlap of bubbles
  if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
    // angle between the two colliding bubbles
    let angle = -Math.atan2(yDistance, xDistance);
    let m1 = bubble.mass;
    let m2 = otherBubble.mass;

    // velocity before collision
    let u1 = rotate(bubble.velocity, angle);
    let u2 = rotate(otherBubble.velocity, angle);

    // velocity after 1-D collision
    let v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    let v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // final velocity after rotating axis back to normal
    let v1Final = rotate(v1, -angle);
    let v2Final = rotate(v2, -angle);

    bubble.velocity.x = v1Final.x;
    bubble.velocity.y = v1Final.y;

    otherBubble.velocity.x = v2Final.x;
    otherBubble.velocity.y = v2Final.y;
  }
};

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

    for (let i = 0; i < bubbleArray.length; i++) {
      if (this === bubbleArray[i]) continue;
      if (isColliding(this, bubbleArray[i])) {
        resolveCollision(this, bubbleArray[i]);
      }
    }
  }
}

// bubbleArray has all the bubbles stored
let bubbleArray = [];

const init = () => {
  bubbleArray = [];
  bubbleConfig.radius =
    Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 80;

  // radius of a bubble
  let radius = bubbleConfig.radius;

  // n: number of bubbles
  let n = bubbleConfig.n;

  // Random bubble location
  let randomX = getRandom(radius, canvas.width - radius);
  let randomY = getRandom(radius, canvas.height - radius);

  // Pushing first bubble
  bubbleArray.push(new Bubble(randomX, randomY, radius));

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
