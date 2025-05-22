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

const init = () => {
  // Your code
};

// Call init()
init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Your code
};

// Call animate()
animate();
