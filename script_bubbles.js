let PI = 22 / 7;
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

let c = canvas.getContext("2d");

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