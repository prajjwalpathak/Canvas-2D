var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

var c = canvas.getContext("2d");

// Rectangle
// c.fillStyle = "rgb(0, 82, 171)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#990000";
// c.fillRect(200, 200, 400, 400);

// Line
// var x1 = 100;
// var y1 = 100;
// var x2 = 4 * x1;
// var y2 = y1;
// var x3 = x2;
// var y3 = 4 * y2;
// var x4 = x1;
// var y4 = y3;

// c.beginPath();
// c.moveTo(x1, y1);
// c.lineTo(x2, y2);
// c.lineTo(x3, y3);
// c.lineTo(x4, y4);
// c.closePath();
// c.strokeStyle = "lime";
// c.stroke();

// Arc
var PI = 22 / 7;
const drawCircle = (x, y, radius) => {
  c.beginPath();
  c.arc(x, y, radius, 0, 2 * PI, false);
  c.strokeStyle = "black";
  c.stroke();
};

let randomX = Math.random() * window.innerWidth;
let randomY = Math.random() * window.innerHeight;
// Draw random circles
// for (let i = 0; i < 5; i++) {
//   let randomX = Math.random() * window.innerWidth * 0.8;
//   let randomY = Math.random() * window.innerHeight * 0.8;
//   let randomRadius = Math.random() * 100;
//   drawCircle(randomX, randomY, randomRadius);
// }

drawCircle(randomX, randomY, 100);
