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

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    // Create Circle
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * PI, false);
    c.strokeStyle = "black";
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }

  changeColor(color) {
    this.color = color;
  }

  nextFrame() {
    this.draw();
  }
}

let cir1;
let cir2;
let loc;
let mouse = {
  x: undefined,
  y: undefined,
};

const init = () => {
  // Initialize circle location
  loc = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  //Circle 1
  cir1 = new Circle(loc.x, loc.y, 64, "gray");

  //Circle 2
  cir2 = new Circle(mouse.x, mouse.y, 32, "black");
};

// Call init()
init();

// Keyboard controls - event listener
const speed = 16;
window.addEventListener("keypress", (event) => {
  if (event.key === "d") {
    loc.x += speed;
  } else if (event.key === "w") {
    loc.y -= speed;
  } else if (event.key === "a") {
    loc.x -= speed;
  } else if (event.key === "s") {
    loc.y += speed;
  }
});

// Mouse controls - event listener
window.addEventListener("mousemove", (event) => {
  // mouse event to mouse object
  mouse.x = event.x;
  mouse.y = event.y;
});

// Get Distance between two points
const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Circle 1 next frame
  cir1.x = loc.x;
  cir1.y = loc.y;
  cir1.nextFrame();

  // Circle 2 next frame
  cir2.x = mouse.x;
  cir2.y = mouse.y;
  cir2.nextFrame();

  // Condition: if distance between two circles <= sum of radius of two circles
  if (
    getDistance(mouse.x, mouse.y, loc.x, loc.y) <=
    cir1.radius + cir2.radius
  ) {
    cir1.changeColor("red");
  } else {
    cir1.changeColor("gray");
  }
};

// Call animate()
animate();
