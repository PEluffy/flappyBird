const grid = document.querySelector(".grid");
const bird = document.createElement("div");
let birdLeftSpace = 50;
let birdBottomSpace = 250;
let isGameOver = false;
let gridWidth = 900;
let gridHeight = 500;
let pipeWidth = 10;
let pipeGap = 150;

function createBird() {
  grid.appendChild(bird);
  bird.classList.add("bird");
  bird.style.left = birdLeftSpace + "px";
  bird.style.bottom = birdBottomSpace + "px";
}
class Pipe {
  constructor() {
    this.gap = pipeGap;
    this.left = Math.random() * (gridWidth - pipeWidth);
    this.topPipeHeight = Math.random() * (gridHeight - pipeGap);
    this.bottomPipeHeight = gridHeight - this.topPipeHeight - this.gap;
    this.topPipe = document.createElement("div");
    this.bottomPipe = document.createElement("div");
    const visualOne = this.topPipe;
    const visualTwo = this.bottomPipe;
    visualOne.classList.add("pipe");
    visualOne.classList.add("topPipe");
    visualTwo.classList.add("Bottompipe");
    visualTwo.classList.add("pipe");
    visualOne.style.left = this.left + "px";
    visualTwo.style.left = this.left + "px";
    visualOne.style.height = this.topPipeHeight + "px";
    visualTwo.style.height = this.bottomPipeHeight + "px";
    visualTwo.style.bottom = 0 + "px";
    visualOne.style.top = 0 + "px";
    grid.appendChild(visualOne);
    grid.appendChild(visualTwo);
  }
}

function start() {
  if (!isGameOver) {
    createBird();
    let pipe = new Pipe();
  }
}

start();
