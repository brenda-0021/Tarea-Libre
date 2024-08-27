const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");
const menuContainer = document.getElementById("menu-container");

let birdY = 250;
let birdVelocity = 0;
let gravity = 0.5;
let isGameOver = false;
let score = 0;
let pipeSpeed = 2;
let pipeInterval = 1500;
let backgroundX = 0;
const backgroundSpeed = pipeSpeed / 2;

startButton.addEventListener("click", () => {
  menuContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  startGame();
});

document.addEventListener("click", () => {
  birdVelocity = -8;
});

function startGame() {
  pipeInterval = setInterval(createPipe, 1500);
  gameLoop();
}

function createPipe() {
  const pipeGap = 120;
  const pipeHeight = Math.floor(Math.random() * 200) + 50;

  const pipeUpper = document.createElement("div");
  pipeUpper.className = "pipe pipe-upper";
  pipeUpper.style.height = `${pipeHeight}px`;
  pipeUpper.style.left = `${gameContainer.clientWidth}px`;

  const pipeLower = document.createElement("div");
  pipeLower.className = "pipe pipe-lower";
  pipeLower.style.height = `${
    gameContainer.clientHeight - pipeHeight - pipeGap
  }px`;
  pipeLower.style.left = `${gameContainer.clientWidth}px`;

  gameContainer.appendChild(pipeUpper);
  gameContainer.appendChild(pipeLower);

  movePipe(pipeUpper, pipeLower);
}

function movePipe(pipeUpper, pipeLower) {
  const interval = setInterval(() => {
    let pipeX = parseInt(pipeUpper.style.left);
    if (pipeX < -50) {
      pipeUpper.remove();
      pipeLower.remove();
      clearInterval(interval);
      score++;
      scoreElement.textContent = score;
    } else {
      pipeUpper.style.left = `${pipeX - pipeSpeed}px`;
      pipeLower.style.left = `${pipeX - pipeSpeed}px`;

      if (checkCollision(pipeUpper) || checkCollision(pipeLower)) {
        gameOver();
        clearInterval(interval);
      }
    }
  }, 20);
}

function checkCollision(pipe) {
  const pipeRect = pipe.getBoundingClientRect();
  const birdRect = bird.getBoundingClientRect();

  return !(
    birdRect.bottom < pipeRect.top ||
    birdRect.top > pipeRect.bottom ||
    birdRect.right < pipeRect.left ||
    birdRect.left > pipeRect.right
  );
}

function gameOver() {
  isGameOver = true;
  clearInterval(pipeInterval);
  alert("Game Over! Your score: " + score);
  window.location.reload();
}

function gameLoop() {
  if (isGameOver) return;

  birdVelocity += gravity;
  birdY += birdVelocity;
  bird.style.top = `${birdY}px`;

  if (birdY > gameContainer.clientHeight || birdY < 0) {
    gameOver();
  }
  backgroundX -= backgroundSpeed;
  gameContainer.style.backgroundPosition = `${backgroundX}px 0`;
  requestAnimationFrame(gameLoop);
}
