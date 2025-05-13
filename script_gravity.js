let PI = 22 / 7;
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

let c = canvas.getContext("2d");

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};