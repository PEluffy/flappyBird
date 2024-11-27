const grid = document.querySelector(".grid");
const bird = document.createElement("div");
let birdLeftSpace = 100;
let birdBottomSpace = 250;
let isGameOver = false;
let gridWidth = 800;
let gridHeight = 500;
let pipeWidth = 10;
let pipeVerticalGap = 150;
let pipeCount = 2;
let pipes = [];
let gravity = 3;
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
  birdBottomSpace += 50;
  bird.style.bottom = birdBottomSpace + "px";
}
function birdFall() {
  isFalling = true;
  isJumping = false;
  birdFallId = setInterval(() => {
    isFalling = true;
    console.log(birdBottomSpace);
    console.log(birdLeftSpace);
    if (birdTouchesceil()) {
      console.log("touches ceil");
      die();
    } else if (birdTouchesGround()) {
      console.log("touches ground");
      die();
    } else if (birdTouchesPipe()) {
      console.log("touches pipe");
      die();
    }
    birdBottomSpace -= gravity;
    bird.style.bottom = birdBottomSpace + "px";
  }, 30);
}
function control(e) {
  if (isGameOver) return;
  if (e.key === "ArrowUp") {
    birdJump();
  }
}
function birdTouchesGround() {
  return birdBottomSpace <= 0;
}
function birdTouchesceil() {
  return birdBottomSpace >= gridHeight - 20;
}
function birdTouchesPipe() {
  return pipes.some(
    (pipe) =>
      birdLeftSpace + 20 >= pipe.left &&
      birdLeftSpace <= pipe.left + pipeWidth &&
      (birdBottomSpace <= pipe.bottomPipeHeight ||
        birdBottomSpace + 20 >= gridHeight - pipe.topPipeHeight)
  );
}

function die() {
  clearInterval(birdFallId);
  clearInterval(platMoveId);
  isGameOver = true;
  document.removeEventListener("keyup", control);
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
