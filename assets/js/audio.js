var audioPlayer = document.querySelector('.audio__player');
var playPause = audioPlayer.querySelector('#playPause');
var playPauseBtn = audioPlayer.querySelector('.play-pause-btn');
var speedBtn = audioPlayer.querySelector('.speed');
var loading = audioPlayer.querySelector('.loading');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var volumeBtn = audioPlayer.querySelector('.volume-btn');
var volumeControls = audioPlayer.querySelector('.volume-controls');
var volumeProgress = volumeControls.querySelector('.slider .progress');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('.current-time');
var previewTime = audioPlayer.querySelector('.preview .total-time');
var totalTime = audioPlayer.querySelector('.time .total-time');
var speaker = audioPlayer.querySelector('#speaker');

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
  
  if(!isDraggable(event.target)) return false;
  
  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;
  
  this.addEventListener('mousemove', window[handleMethod], false);

  window.addEventListener('mouseup', () => {
    currentlyDragged = false;
    window.removeEventListener('mousemove', window[handleMethod], false);
  }, false);  
});

playPauseBtn.addEventListener('click', togglePlay);
speedBtn.addEventListener('click', speedPlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('volumechange', updateVolume);
player.addEventListener('loadedmetadata', () => {
  previewTime.textContent = formatTime(player.duration);
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('canplay', makePlay);
player.addEventListener('ended', function(){
  playPause.className = "play-pause-icon icon icon-play-solid";
  player.currentTime = 0;
});

volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('open');
  volumeControls.classList.toggle('hidden');
})

window.addEventListener('resize', directionAware);

sliders.forEach(slider => {
  let pin = slider.querySelector('.pin');
  slider.addEventListener('click', window[pin.dataset.method]);
});

directionAware();

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let rect = rangeBox.getBoundingClientRect();
  let direction = rangeBox.dataset.direction;
  if(direction == 'horizontal') {
    var min = rangeBox.offsetLeft;
    var max = min + rangeBox.offsetWidth;   
    if(event.clientX < min || event.clientX > max) return false;
  } else {
    var min = rect.top;
    var max = min + rangeBox.offsetHeight; 
    if(event.clientY < min || event.clientY > max) return false;  
  }
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';
  
  currentTime.textContent = formatTime(current);
}

function updateVolume() {
  volumeProgress.style.height = player.volume * 100 + '%';
  if(player.volume >= 0.5) {
    speaker.innerHTML = '<path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M851.28,914.81c-10.12,0-20.06-4.78-26.29-13.71-10.1-14.5-6.54-34.45,7.96-44.55,39.86-27.77,74.06-73.61,98.9-132.57,26.25-62.29,40.12-135.15,40.12-210.71s-14.24-150.34-41.17-213.17c-25.48-59.46-60.43-105.2-101.06-132.29-14.71-9.8-18.68-29.67-8.88-44.38,9.8-14.71,29.67-18.68,44.38-8.88,50.99,33.99,94,89.43,124.38,160.32,30.32,70.73,46.34,153.17,46.34,238.39s-15.61,165.48-45.14,235.56c-29.55,70.13-71.49,125.53-121.29,160.23-5.57,3.88-11.95,5.75-18.26,5.75Z"/><path d="M787.38,750.37c-9.54,0-18.99-4.25-25.3-12.37-10.84-13.96-8.31-34.06,5.65-44.9,38.21-29.67,63.88-102.16,63.88-180.38,0-91.83-32.75-157.27-65.21-181.4-14.18-10.54-17.14-30.59-6.6-44.77,10.54-14.18,30.58-17.14,44.77-6.6,27.74,20.62,50.93,53.68,67.06,95.62,15.69,40.79,23.98,88.22,23.98,137.14s-8.08,95.09-23.35,135.5c-15.66,41.44-38.24,74.44-65.28,95.43-5.84,4.53-12.75,6.73-19.6,6.73Z"/>';  
  } else if(player.volume < 0.5 && player.volume > 0.05) {
    speaker.innerHTML = '<path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M787.38,750.37c-9.54,0-18.99-4.25-25.3-12.37-10.84-13.96-8.31-34.06,5.65-44.9,38.21-29.67,63.88-102.16,63.88-180.38,0-91.83-32.75-157.27-65.21-181.4-14.18-10.54-17.14-30.59-6.6-44.77,10.54-14.18,30.58-17.14,44.77-6.6,27.74,20.62,50.93,53.68,67.06,95.62,15.69,40.79,23.98,88.22,23.98,137.14s-8.08,95.09-23.35,135.5c-15.66,41.44-38.24,74.44-65.28,95.43-5.84,4.53-12.75,6.73-19.6,6.73Z"/>';
  } else if(player.volume <= 0.05) {
    speaker.innerHTML = '<path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M969.44,512l173.19-173.19c12.5-12.5,12.5-32.76,0-45.25-12.5-12.5-32.76-12.5-45.25,0l-173.19,173.19-173.19-173.19c-12.5-12.5-32.76-12.5-45.25,0-12.5,12.5-12.5,32.76,0,45.25l173.19,173.19-173.19,173.19c-12.5,12.5-12.5,32.76,0,45.25,6.25,6.25,14.44,9.37,22.63,9.37s16.38-3.12,22.63-9.37l173.19-173.19,173.19,173.19c6.25,6.25,14.44,9.37,22.63,9.37s16.38-3.12,22.63-9.37c12.5-12.5,12.5-32.76,0-45.25l-173.19-173.19Z"/>';
  }
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
  let rect = slider.getBoundingClientRect();
  let K = 0;
  if(slider.dataset.direction == 'horizontal') {
    
    let offsetX = event.clientX - slider.offsetLeft;
    let width = slider.clientWidth;
    K = offsetX / width;    
    
  } else if(slider.dataset.direction == 'vertical') {
    
    let height = slider.clientHeight;
    var offsetY = event.clientY - rect.top;
    K = 1 - offsetY / height;
    
  }
  return K;
}

function rewind(event) {
  if(inRange(event)) {
    player.currentTime = player.duration * getCoefficient(event);
  }
}

function changeVolume(event) {
  if(inRange(event)) {
    player.volume = getCoefficient(event);
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

let speedArray = ['1', '1.25', '1.5', '1.75', '2', '0.5', '0.75'];
let clickCount = 0;
function speedPlay() {
  if ( clickCount < (speedArray.length - 1) ) {
    clickCount ++;
  } else {
    clickCount = 0;
  }
  speedBtn.innerHTML = `${speedArray[clickCount]}X`;
  player.playbackRate = speedArray[clickCount];
}

function togglePlay() {
  if(player.paused) {
    playPause.className = "play-pause-icon icon icon-pause-solid";
    player.play();
  } else {
    playPause.className = "play-pause-icon icon icon-play-solid";
    player.pause();
  }  
}

function makePlay() {
  playPauseBtn.style.display = 'flex';
  loading.style.display = 'none';
}

function directionAware() {
  if(window.innerHeight < 250) {
    volumeControls.style.bottom = '-54px';
    volumeControls.style.left = '54px';
  } else if(audioPlayer.offsetTop < 154) {
    volumeControls.style.bottom = '-164px';
    volumeControls.style.left = '-3px';
  } else {
    volumeControls.style.bottom = '27px';
    volumeControls.style.left = '50%';
  }
}
