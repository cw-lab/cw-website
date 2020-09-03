var audioPlayer = document.querySelector('.green-audio-player');
var playPause = audioPlayer.querySelector('#playPause');
var playpauseBtn = audioPlayer.querySelector('.play-pause-btn');
var loading = audioPlayer.querySelector('.loading');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var volumeBtn = audioPlayer.querySelector('.volume-btn');
var volumeControls = audioPlayer.querySelector('.volume-controls');
var volumeProgress = volumeControls.querySelector('.slider .progress');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('.current-time');
var totalTime = audioPlayer.querySelector('.total-time');
var speaker = audioPlayer.querySelector('#speaker');
var backup = audioPlayer.querySelector('.replay-10'); // replay 10 seconds
var advance = audioPlayer.querySelector('.forward-10'); //forward 10 seconds

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
    if (!isDraggable(event.target)) return false;
    currentlyDragged = event.target;
    var handleMethod = currentlyDragged.dataset.method;

    this.addEventListener('mousemove', window[handleMethod], false);

    window.addEventListener('mouseup', function() {
        currentlyDragged = false;
        window.removeEventListener('mousemove', window[handleMethod], false);
    }, false);
});


backup.addEventListener('click', function() {
    player.currentTime = player.currentTime - 10
});

advance.addEventListener('click', function() {
    player.currentTime = player.currentTime + 10

});

playpauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('volumechange', updateVolume);
player.addEventListener('loadedmetadata', function() {
    totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('canplay', makePlay);
player.addEventListener('ended', function() {
    playPause.attributes.class.value = "audio audio-play";
    player.currentTime = 0;
});

volumeBtn.addEventListener('click', function() {
    volumeBtn.classList.toggle('open');
    volumeControls.classList.toggle('hidden');
});

window.addEventListener('resize', directionAware);

sliders.forEach(function(slider) {
    var pin = slider.querySelector('.pin');
    slider.addEventListener('click', window[pin.dataset.method]);
});

directionAware();

function isDraggable(el) {
    var canDrag = false;
    var classes = Array.from(el.classList);
    draggableClasses.forEach(function(draggable) {
        if (classes.indexOf(draggable) !== -1) canDrag = true;
    });
    return canDrag;
}

function inRange(event) {
    var rangeBox = getRangeBox(event);
    var rect = rangeBox.getBoundingClientRect();
    var direction = rangeBox.dataset.direction;
    if (direction == 'horizontal') {
        var min = rangeBox.offsetLeft;
        var max = min + rangeBox.offsetWidth;
        if (event.clientX < min || event.clientX > max) return false;
    } else {
        var min = rect.top;
        var max = min + rangeBox.offsetHeight;
        if (event.clientY < min || event.clientY > max) return false;
    }
    return true;
}

function updateProgress() {
    var current = player.currentTime;
    var percent = current / player.duration * 100;
    progress.style.width = percent + '%';

    currentTime.textContent = formatTime(current);
}

function updateVolume() {
    volumeProgress.style.height = player.volume * 100 + '%';
    if (player.volume >= 0.5) {
        speaker.attributes.class.value = "audio audio-volume-up";
    } else if (player.volume < 0.5 && player.volume > 0.05) {
        speaker.attributes.class.value = "audio audio-volume-down";
    } else if (player.volume <= 0.05) {
        speaker.attributes.class.value = "audio audio-volume-mute";
    }
}

function getRangeBox(event) {
    var rangeBox = event.target;
    var el = currentlyDragged;
    if (event.type == 'click' && isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
    }
    if (event.type == 'mousemove') {
        rangeBox = el.parentElement.parentElement;
    }
    return rangeBox;
}

function getCoefficient(event) {
    var slider = getRangeBox(event);
    var rect = slider.getBoundingClientRect();
    var K = 0;
    if (slider.dataset.direction == 'horizontal') {

        var offsetX = event.clientX - slider.offsetLeft;
        var width = slider.clientWidth;
        K = offsetX / width;
    } else if (slider.dataset.direction == 'vertical') {

        var height = slider.clientHeight;
        var offsetY = event.clientY - rect.top;
        K = 1 - offsetY / height;
    }
    return K;
}

function rewind(event) {
    if (inRange(event)) {
        player.currentTime = player.duration * getCoefficient(event);
    }
}

function changeVolume(event) {
    if (inRange(event)) {
        player.volume = getCoefficient(event);
    }
}

function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return min + ':' + (sec < 10 ? '0' + sec : sec);
}

function togglePlay() {
    if (player.paused) {
        playPause.attributes.class.value = "audio audio-pause";
        player.play();
    } else {
        playPause.attributes.class.value = "audio audio-play";
        player.pause();
    }
}

function makePlay() {
    playpauseBtn.style.visibility = 'visible';
    loading.style.visibility = 'hidden';
}

function directionAware() {
    // if (window.innerHeight < 250) {
    //     volumeControls.style.bottom = '-54px';
    //     volumeControls.style.left = '54px';
    // } else if (audioPlayer.offsetTop < 154) {
    //     volumeControls.style.bottom = '-164px';
    //     volumeControls.style.left = '-3px';
    // } else {
        volumeControls.style.bottom = '125%';
        volumeControls.style.left = '50%';
    // }
}