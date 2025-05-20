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
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    // Create Circle
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * PI, false);
    c.stroke();
  }

  nextFrame() {
    // window.addEventListener("keypress", (event) => {
    //   if (event.key === "d") {
    //     this.x += this.dx;
    //   } else if (event.key === "w") {
    //     this.y += this.dy;
    //   } else if (event.key === "a") {
    //     this.x -= this.dx;
    //   } else if (event.key === "s") {
    //     this.y -= this.dy;
    //   }
    // });
    this.draw();
  }
}

let cir1;
let loc = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const init = () => {
  cir1 = new Circle(loc.x, loc.y, 64, 2, 2);
};

// Call init()
init();

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

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  cir1.x = loc.x;
  cir1.y = loc.y;
  cir1.nextFrame();
};

// Call animate()
animate();
