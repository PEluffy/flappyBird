const grid = document.querySelector(".grid");
const bird = document.createElement("div");
let birdLeftSpace = 50;
let birdBottomSpace = 250;
let isGameOver = false;
let gridWidth = 800;
let gridHeight = 500;
let pipeWidth = 10;
let pipeVerticalGap = 150;
let pipeCount = 2;
let pipes = [];
let gravity = 2;
let birdFallId;
let platMoveId;
let isFalling = false;
let isJumping = false;

function createBird() {
  grid.appendChild(bird);
  bird.classList.add("bird");
  bird.style.left = birdLeftSpace + "px";
  bird.style.bottom = birdBottomSpace + "px";
}
class Pipe {
  constructor(newPipeLeft) {
    this.gap = pipeVerticalGap;
    this.left = newPipeLeft;
    this.topPipeHeight = Math.random() * (gridHeight - pipeVerticalGap);
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
function createPipes() {
  for (let i = 0; i < pipeCount; i++) {
    let pipeHoriGap = gridWidth / pipeCount;
    let newPipeLeft = 300 + i * pipeHoriGap;
    let newpipe = new Pipe(newPipeLeft);
    pipes.push(newpipe);
  }
}
function movePipes() {
  // console.log(pipes);
  pipes.forEach((pipe) => {
    pipe.left -= 2;
    let visualOne = pipe.topPipe;
    let visualTwo = pipe.bottomPipe;
    visualOne.style.left = pipe.left + "px";
    visualTwo.style.left = pipe.left + "px";
    if (pipe.left <= 0) {
      let firstpipeVisualone = pipes[0].topPipe;
      let firstpipeVisualtwo = pipes[0].bottomPipe;
      firstpipeVisualone.classList.remove("pipe");
      firstpipeVisualtwo.classList.remove("pipe");
      pipes.shift();
      let newPipe = new Pipe(gridWidth - 60);
      pipes.push(newPipe);
    }
  });
}

function birdJump() {
  isJumping = true;
  isFalling = false;
  birdBottomSpace += 20;
  bird.style.buttom = birdBottomSpace + "px";
}
function birdFall() {
  isFalling = true;
  isJumping = false;
  birdFallId = setInterval(() => {
    isFalling = true;
    console.log(birdBottomSpace);
    if (birdTouchesceil() || birdTouchesGround()) {
      console.log("die");
      die();
    }
    birdBottomSpace -= gravity;
    bird.style.bottom = birdBottomSpace + "px";
  }, 30);
}
function control(e) {
  if (!isGameOver) {
    if (e.key === "ArrowUp") {
      birdJump();
    }
  }
}
function birdTouchesGround() {
  if (birdBottomSpace === 0) {
    return true;
  }
}
function birdTouchesceil() {
  if (birdBottomSpace === gridHeight - 20) {
    return true;
  }
}

function die() {
  clearInterval(birdFallId);
  clearInterval(platMoveId);
}
function start() {
  if (!isGameOver) {
    createBird();
    createPipes();
    platMoveId = setInterval(movePipes, 30);
    document.addEventListener("keyup", control);
    birdFall();
  }
}

start();
