let canvas;
let world;
let controls = new Controls();
intervalIds = [];
isMute = false;

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  initLevel1();
  world = new World(canvas, controls);
  document.getElementById("start-screen").classList.add("d-none");
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}

function setStopableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowUp" || e.code == "KeyW") controls.UP = true;
  if (e.code == "ArrowDown" || e.code == "KeyS") controls.DOWN = true;
  if (e.code == "ArrowLeft" || e.code == "KeyA") controls.LEFT = true;
  if (e.code == "ArrowRight" || e.code == "KeyD") controls.RIGHT = true;
  if (e.code == "Space") controls.SPACE = true;
});

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowUp" || e.code == "KeyW") controls.UP = false;
  if (e.code == "ArrowDown" || e.code == "KeyS") controls.DOWN = false;
  if (e.code == "ArrowLeft" || e.code == "KeyA") controls.LEFT = false;
  if (e.code == "ArrowRight" || e.code == "KeyD") controls.RIGHT = false;
  if (e.code == "Space") controls.SPACE = false;
});

function randomY() {
  min = 30;
  max = 380;
  return Math.random() * (max - min) + min;
}

function randomX(max) {
  min = 500;
  return Math.random() * (max - min) + min;
}

function openFullScreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    /* Safari */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    /* IE11 */
    canvas.msRequestFullscreen();
  }
}

function showKillScreen() {
  world.bg_sound.pause();
  stopGame();
  document.getElementById("kill-screen").classList.remove("d-none");
  document.getElementById("retry").classList.remove("d-none");

  /*   setTimeout(() => {
    document.getElementById("kill-screen").classList.remove("d-none");
    document.getElementById("you-win").classList.add("fadeIn");

    setTimeout(() => {
      document.getElementById("retry").classList.remove("d-none");
      stopGame();
    }, 1100);
  }, 2000); */
}

function showGameoverScreen() {
  world.bg_sound.pause();
  stopAudio();
  setTimeout(() => {
    document.getElementById("gameover-screen").classList.remove("d-none");
    document.getElementById("gameover").classList.add("fadeIn");

    setTimeout(() => {
      document.getElementById("retry-gameover").classList.remove("d-none");
      stopGame();
    }, 1100);
  }, 2000);
}

function resetKillScreen() {
  document.getElementById("kill-screen").classList.add("d-none");
  document.getElementById("you-win").classList.remove("fadeIn");
  document.getElementById("retry").classList.add("d-none");
}

function resetGameoverScreen() {
  document.getElementById("gameover-screen").classList.add("d-none");
}

function startAudio() {
  isMute = false;
  world.isMute = false;
  world.character.isMute = false;
  world.level.enemies.forEach((enemy) => {
    enemy.isMute = false;
  });

  world.bg_sound.play();

  document.getElementById("audio-on").classList.remove("d-none");
  document.getElementById("audio-off").classList.add("d-none");
}

function stopAudio() {
  isMute = true;
  world.isMute = true;
  world.character.isMute = true;
  world.level.enemies.forEach((enemy) => {
    enemy.isMute = true;
  });
  world.bg_sound.pause();
  document.getElementById("audio-on").classList.add("d-none");
  document.getElementById("audio-off").classList.remove("d-none");
}
