(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GreenAudioPlayer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports = require('./src/js/main')["default"];

},{"./src/js/main":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GreenAudioPlayer =
/*#__PURE__*/
function () {
  function GreenAudioPlayer(player, options) {
    _classCallCheck(this, GreenAudioPlayer);

    this.audioPlayer = document.querySelector(player);
    var opts = options || {};
    var audioElement = this.audioPlayer.innerHTML;
    this.audioPlayer.classList.add('green-audio-player');
    this.audioPlayer.innerHTML = GreenAudioPlayer.getTemplate() + audioElement;
    this.playPauseBtn = this.audioPlayer.querySelector('.play-pause-btn');
    this.loading = this.audioPlayer.querySelector('.loading');
    this.sliders = this.audioPlayer.querySelectorAll('.slider');
    this.progress = this.audioPlayer.querySelector('.controls__progress');
    this.volumeBtn = this.audioPlayer.querySelector('.volume__button');
    this.volumeControls = this.audioPlayer.querySelector('.volume__controls');
    this.volumeProgress = this.volumeControls.querySelector('.volume__progress');
    this.player = this.audioPlayer.querySelector('audio');
    this.currentTime = this.audioPlayer.querySelector('.controls__current-time');
    this.previewTime = this.audioPlayer.querySelector('.preview__total-time');
    this.totalTime = this.audioPlayer.querySelector('.controls__total-time');
    this.speaker = this.audioPlayer.querySelector('.volume__speaker');
    this.speedBtn = this.audioPlayer.querySelector('.speed');
    this.draggableClasses = ['pin'];
    this.currentlyDragged = null;
    this.speedArray = ['1', '1.25', '1.5', '1.75', '2', '0.5', '0.75'];
    this.clickCount = 0;
    this.stopOthersOnPlay = opts.stopOthersOnPlay || false;
    this.initEvents();
    this.directionAware();
    this.overcomeIosLimitations();
  }

  _createClass(GreenAudioPlayer, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var self = this;
      self.audioPlayer.addEventListener('mousedown', function (event) {
        if (self.isDraggable(event.target)) {
          self.currentlyDragged = event.target;
          var handleMethod = self.currentlyDragged.dataset.method;
          var listener = self[handleMethod].bind(self);
          window.addEventListener('mousemove', listener, false);
          window.addEventListener('mouseup', function () {
            self.currentlyDragged = false;
            window.removeEventListener('mousemove', listener, false);
          }, false);
        }
      }); // for mobile touches

      self.audioPlayer.addEventListener('touchstart', function (event) {
        if (self.isDraggable(event.target)) {
          var _event$targetTouches = _slicedToArray(event.targetTouches, 1);

          self.currentlyDragged = _event$targetTouches[0];
          var handleMethod = self.currentlyDragged.target.dataset.method;
          var listener = self[handleMethod].bind(self);
          window.addEventListener('touchmove', listener, false);
          window.addEventListener('touchend', function () {
            self.currentlyDragged = false;
            window.removeEventListener('touchmove', listener, false);
          }, false);
          event.preventDefault();
        }
      });
      this.playPauseBtn.addEventListener('click', this.togglePlay.bind(self));
      this.player.addEventListener('timeupdate', this.updateProgress.bind(self));
      this.player.addEventListener('volumechange', this.updateVolume.bind(self));
      this.player.addEventListener('loadedmetadata', function (e) {
        _this.previewTime.textContent = e.target.dataset.time;
        _this.totalTime.textContent = GreenAudioPlayer.formatTime(self.player.duration);
      });
      this.player.addEventListener('seeking', this.showLoadingIndicator.bind(self));
      this.player.addEventListener('seeked', this.hideLoadingIndicator.bind(self));
      this.player.addEventListener('canplay', this.hideLoadingIndicator.bind(self));
      this.player.addEventListener('ended', function () {
        GreenAudioPlayer.pausePlayer(self.player);
        self.player.currentTime = 0;
      });
      this.volumeBtn.addEventListener('click', function () {
        self.volumeBtn.classList.toggle('open');
        self.volumeControls.classList.toggle('hidden');
      });
      this.speedBtn.addEventListener('click', this.speedPlay.bind(self));
      window.addEventListener('resize', self.directionAware.bind(self));
      window.addEventListener('scroll', self.directionAware.bind(self));

      for (var i = 0; i < this.sliders.length; i++) {
        var pin = this.sliders[i].querySelector('.pin');
        this.sliders[i].addEventListener('click', self[pin.dataset.method].bind(self));
      }
    }
  }, {
    key: "overcomeIosLimitations",
    value: function overcomeIosLimitations() {
      var self = this;

      if (window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i)) {
        // iOS does not support "canplay" event
        this.player.addEventListener('loadedmetadata', this.hideLoadingIndicator.bind(self)); // iOS does not let "volume" property be set programmatically

        this.audioPlayer.querySelector('.volume').style.display = 'none';
        this.audioPlayer.querySelector('.controls').style.marginRight = '0';
      }
    }
  }, {
    key: "isDraggable",
    value: function isDraggable(el) {
      var canDrag = false;
      if (typeof el.classList === 'undefined') return false; // fix for IE 11 not supporting classList on SVG elements

      for (var i = 0; i < this.draggableClasses.length; i++) {
        if (el.classList.contains(this.draggableClasses[i])) {
          canDrag = true;
        }
      }

      return canDrag;
    }
  }, {
    key: "inRange",
    value: function inRange(event) {
      var touch = 'touches' in event; // instanceof TouchEvent may also be used

      var rangeBox = this.getRangeBox(event);
      var sliderPositionAndDimensions = rangeBox.getBoundingClientRect();
      var direction = rangeBox.dataset.direction;
      var min = null;
      var max = null;

      if (direction === 'horizontal') {
        min = sliderPositionAndDimensions.x;
        max = min + sliderPositionAndDimensions.width;
        var clientX = touch ? event.touches[0].clientX : event.clientX;
        if (clientX < min || clientX > max) return false;
      } else {
        min = sliderPositionAndDimensions.top;
        max = min + sliderPositionAndDimensions.height;
        var clientY = touch ? event.touches[0].clientY : event.clientY;
        if (clientY < min || clientY > max) return false;
      }

      return true;
    }
  }, {
    key: "updateProgress",
    value: function updateProgress() {
      var current = this.player.currentTime;
      var percent = current / this.player.duration * 100;
      this.progress.style.width = "".concat(percent, "%");
      this.currentTime.textContent = GreenAudioPlayer.formatTime(current);
    }
  }, {
    key: "updateVolume",
    value: function updateVolume() {
      this.volumeProgress.style.height = "".concat(this.player.volume * 100, "%");

      if (this.player.volume >= 0.5) {
        this.speaker.innerHTML = '<path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M851.28,914.81c-10.12,0-20.06-4.78-26.29-13.71-10.1-14.5-6.54-34.45,7.96-44.55,39.86-27.77,74.06-73.61,98.9-132.57,26.25-62.29,40.12-135.15,40.12-210.71s-14.24-150.34-41.17-213.17c-25.48-59.46-60.43-105.2-101.06-132.29-14.71-9.8-18.68-29.67-8.88-44.38,9.8-14.71,29.67-18.68,44.38-8.88,50.99,33.99,94,89.43,124.38,160.32,30.32,70.73,46.34,153.17,46.34,238.39s-15.61,165.48-45.14,235.56c-29.55,70.13-71.49,125.53-121.29,160.23-5.57,3.88-11.95,5.75-18.26,5.75Z"/><path d="M787.38,750.37c-9.54,0-18.99-4.25-25.3-12.37-10.84-13.96-8.31-34.06,5.65-44.9,38.21-29.67,63.88-102.16,63.88-180.38,0-91.83-32.75-157.27-65.21-181.4-14.18-10.54-17.14-30.59-6.6-44.77,10.54-14.18,30.58-17.14,44.77-6.6,27.74,20.62,50.93,53.68,67.06,95.62,15.69,40.79,23.98,88.22,23.98,137.14s-8.08,95.09-23.35,135.5c-15.66,41.44-38.24,74.44-65.28,95.43-5.84,4.53-12.75,6.73-19.6,6.73Z"/>';
      } else if (this.player.volume < 0.5 && this.player.volume > 0.05) {
        this.speaker.innerHTML = '<path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M787.38,750.37c-9.54,0-18.99-4.25-25.3-12.37-10.84-13.96-8.31-34.06,5.65-44.9,38.21-29.67,63.88-102.16,63.88-180.38,0-91.83-32.75-157.27-65.21-181.4-14.18-10.54-17.14-30.59-6.6-44.77,10.54-14.18,30.58-17.14,44.77-6.6,27.74,20.62,50.93,53.68,67.06,95.62,15.69,40.79,23.98,88.22,23.98,137.14s-8.08,95.09-23.35,135.5c-15.66,41.44-38.24,74.44-65.28,95.43-5.84,4.53-12.75,6.73-19.6,6.73Z"/>';
      } else if (this.player.volume <= 0.05) {
        this.speaker.innerHTML = '<path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M969.44,512l173.19-173.19c12.5-12.5,12.5-32.76,0-45.25-12.5-12.5-32.76-12.5-45.25,0l-173.19,173.19-173.19-173.19c-12.5-12.5-32.76-12.5-45.25,0-12.5,12.5-12.5,32.76,0,45.25l173.19,173.19-173.19,173.19c-12.5,12.5-12.5,32.76,0,45.25,6.25,6.25,14.44,9.37,22.63,9.37s16.38-3.12,22.63-9.37l173.19-173.19,173.19,173.19c6.25,6.25,14.44,9.37,22.63,9.37s16.38-3.12,22.63-9.37c12.5-12.5,12.5-32.76,0-45.25l-173.19-173.19Z"/>';
      }
    }
  }, {
    key: "getRangeBox",
    value: function getRangeBox(event) {
      var rangeBox = event.target;
      var el = this.currentlyDragged;

      if (event.type === 'click' && this.isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
      }

      if (event.type === 'mousemove') {
        rangeBox = el.parentElement.parentElement;
      }

      if (event.type === 'touchmove') {
        rangeBox = el.target.parentElement.parentElement;
      }

      return rangeBox;
    }
  }, {
    key: "getCoefficient",
    value: function getCoefficient(event) {
      var touch = 'touches' in event; // instanceof TouchEvent may also be used

      var slider = this.getRangeBox(event);
      var sliderPositionAndDimensions = slider.getBoundingClientRect();
      var K = 0;

      if (slider.dataset.direction === 'horizontal') {
        // if event is touch
        var clientX = touch ? event.touches[0].clientX : event.clientX;
        var offsetX = clientX - sliderPositionAndDimensions.left;
        var width = sliderPositionAndDimensions.width;
        K = offsetX / width;
      } else if (slider.dataset.direction === 'vertical') {
        var height = sliderPositionAndDimensions.height;
        var clientY = touch ? event.touches[0].clientY : event.clientY;
        var offsetY = clientY - sliderPositionAndDimensions.top;
        K = 1 - offsetY / height;
      }

      return K;
    }
  }, {
    key: "rewind",
    value: function rewind(event) {
      if (this.inRange(event)) {
        this.player.currentTime = this.player.duration * this.getCoefficient(event);
      }
    }
  }, {
    key: "changeVolume",
    value: function changeVolume(event) {
      if (this.inRange(event)) {
        this.player.volume = Math.round(this.getCoefficient(event) * 10) / 10;
      }
    }
  }, {
    key: "speedPlay",
    value: function speedPlay() {
      if ( this.clickCount < (this.speedArray.length - 1) ) {
        this.clickCount ++;
      } else {
        this.clickCount = 0;
      }
      this.speedBtn.innerHTML = `${this.speedArray[this.clickCount]}X`;
      this.player.playbackRate = this.speedArray[this.clickCount];
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (this.player.paused) {
        if (this.stopOthersOnPlay) {
          GreenAudioPlayer.stopOtherPlayers();
        }

        GreenAudioPlayer.playPlayer(this.player);
      } else {
        GreenAudioPlayer.pausePlayer(this.player);
      }
    }
  }, {
    key: "showLoadingIndicator",
    value: function showLoadingIndicator() {
      this.playPauseBtn.style.display = 'none';
      this.loading.style.display = 'block';
    }
  }, {
    key: "hideLoadingIndicator",
    value: function hideLoadingIndicator() {
      this.playPauseBtn.style.display = 'block';
      this.loading.style.display = 'none';
    }
  }, {
    key: "directionAware",
    value: function directionAware() {
      this.volumeControls.classList.remove('top', 'middle', 'bottom');

      if (window.innerHeight < 250) {
        this.volumeControls.classList.add('middle');
      } else if (this.audioPlayer.getBoundingClientRect().top < 180) {
        this.volumeControls.classList.add('bottom');
      } else {
        this.volumeControls.classList.add('top');
      }
    }
  }], [{
    key: "getTemplate",
    value: function getTemplate() {
      return `<div class="loading">
                  <div class="loading__spinner"></div>
              </div>
              <div class="play-pause-btn">
                  <i class="play-pause-icon icon icon-play-solid"></i>
              </div>
              <div class="preview">
                  文章語音朗讀・<span class="preview__total-time">0:00</span>
              </div>
              <div class="controls">
                  <span class="controls__current-time">0:00</span> / <span class="controls__total-time">0:00</span>
                  <div class="controls__slider slider" data-direction="horizontal">
                      <div class="controls__progress gap-progress">
                          <div class="pin progress__pin" data-method="rewind"></div>
                      </div>
                  </div>
              </div>
              <div class="volume">
                  <div class="volume__button">
                      <svg class="volume__speaker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 1024"><path d="M579,1016.6l-311.6-269.4H30.4c-16.8,0-30.4-13.6-30.4-30.4V307.2c0-16.8,13.6-30.4,30.4-30.4h237L579,7.4c19.6-17,50.2-3,50.2,23V993.6c0,26-30.6,40-50.2,23Z"/><path d="M851.28,914.81c-10.12,0-20.06-4.78-26.29-13.71-10.1-14.5-6.54-34.45,7.96-44.55,39.86-27.77,74.06-73.61,98.9-132.57,26.25-62.29,40.12-135.15,40.12-210.71s-14.24-150.34-41.17-213.17c-25.48-59.46-60.43-105.2-101.06-132.29-14.71-9.8-18.68-29.67-8.88-44.38,9.8-14.71,29.67-18.68,44.38-8.88,50.99,33.99,94,89.43,124.38,160.32,30.32,70.73,46.34,153.17,46.34,238.39s-15.61,165.48-45.14,235.56c-29.55,70.13-71.49,125.53-121.29,160.23-5.57,3.88-11.95,5.75-18.26,5.75Z"/><path d="M787.38,750.37c-9.54,0-18.99-4.25-25.3-12.37-10.84-13.96-8.31-34.06,5.65-44.9,38.21-29.67,63.88-102.16,63.88-180.38,0-91.83-32.75-157.27-65.21-181.4-14.18-10.54-17.14-30.59-6.6-44.77,10.54-14.18,30.58-17.14,44.77-6.6,27.74,20.62,50.93,53.68,67.06,95.62,15.69,40.79,23.98,88.22,23.98,137.14s-8.08,95.09-23.35,135.5c-15.66,41.44-38.24,74.44-65.28,95.43-5.84,4.53-12.75,6.73-19.6,6.73Z"/></svg>
                  </div>
                  <div class="volume__controls hidden">
                      <div class="volume__slider slider" data-direction="vertical">
                          <div class="volume__progress gap-progress">
                              <div class="pin volume__pin" data-method="changeVolume"></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="speed">1X</div>`;
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      return "".concat(min, ":").concat(sec < 10 ? "0".concat(sec) : sec);
    }
  }, {
    key: "pausePlayer",
    value: function pausePlayer(player) {
      var playPauseButton = player.parentElement.querySelector('.play-pause-icon');
      playPauseButton.className = "play-pause-icon icon icon-play-solid";
      player.pause();
    }
  }, {
    key: "playPlayer",
    value: function playPlayer(player) {
      var playPauseButton = player.parentElement.querySelector('.play-pause-icon');
      player.parentElement.classList.remove("audio__player--standby");
      playPauseButton.className = "play-pause-icon icon icon-pause-solid";
      player.play();
    }
  }, {
    key: "stopOtherPlayers",
    value: function stopOtherPlayers() {
      var players = document.querySelectorAll('.green-audio-player audio');

      for (var i = 0; i < players.length; i++) {
        GreenAudioPlayer.pausePlayer(players[i]);
      }
    }
  }]);

  return GreenAudioPlayer;
}();

var _default = GreenAudioPlayer;
exports["default"] = _default;

},{}]},{},[1])(1)
});
