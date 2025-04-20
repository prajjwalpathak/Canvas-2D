var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillRect(100, 100, 100, 100);
c.fillRect(200, 200, 400, 400);

var x1 = 100;
var y1 = 100;
var x2 = 4*x1;
var y2 = y1;
var x3 = x2;
var y3 = 4*y2;
var x4 = x1;
var y4 = y3;


c.beginPath();
c.moveTo(x1, y1);
c.lineTo(x2, y2);
c.lineTo(x3, y3);
c.lineTo(x4, y4);
c.closePath();
c.strokeStyle = "lime"
c.stroke();