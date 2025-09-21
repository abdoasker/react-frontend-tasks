const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const text = document.getElementById("textColor");

function changeColor() {
  const r = red.value;
  const g = green.value;
  const b = blue.value;
  text.style.color = `rgb(${r}, ${g}, ${b})`;
}

red.addEventListener("change", changeColor);
green.addEventListener("change", changeColor);
blue.addEventListener("change", changeColor);

// 2
let video = document.getElementById("video");
let time = document.getElementById("time");
let totalTime = document.getElementById("totalTime");
let progress = document.getElementById("progress");
let speedControl = document.getElementById("speed");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function playVideo() {
  video.play();
}
function pauseVideo() {
  video.pause();
}
function stopVideo() {
  video.pause();
  video.currentTime = 0;
}
function reverseVideo() {
  video.currentTime -= 10;
}
function forwardVideo() {
  video.currentTime += 10;
}
function fwd5() {
  video.currentTime += 5;
}
function back5() {
  video.currentTime -= 5;
}
function muteVideo() {
  video.muted = !video.muted;
}

video.addEventListener("timeupdate", () => {
  time.textContent = formatTime(video.currentTime);
  progress.value = (video.currentTime / video.duration) * 100;
});

video.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(video.duration);
});

speedControl.addEventListener("input", () => {
  video.playbackRate = speedControl.value;
});
