const selector = document.getElementById('video-selector');
const player = document.getElementById('video-player-div');

const fileDrop = document.getElementById('fileDrop');
fileDrop.addEventListener('change', (e) => {
  this.prepareFile(e.target.files);
  selector.style.display = 'none';
  player.style.display = 'block'; 
});

const goBack = document.getElementById('new-video');
goBack.addEventListener('click', (e) => {
  selector.style.display = 'block';
  player.style.display = 'none'; 
});

const originalVideoToggle = document.getElementById('original-video');
const processedVideoToggle = document.getElementById('processed-video');
const originalVideo = document.getElementById('video-player');
const processedVideo = document.getElementById('processed-player');

originalVideoToggle.addEventListener('click', (e) => {
  deactivateButton(processedVideoToggle);
  activateButton(originalVideoToggle);
  originalVideo.style.display = 'block';
  processedVideo.style.display = 'none';
});

processedVideoToggle.addEventListener('click', (e) => {
  deactivateButton(originalVideoToggle);
  activateButton(processedVideoToggle);
  originalVideo.style.display = 'none';
  processedVideo.style.display = 'block';
});

/**
 * Convert Files list to normal array list
 */
function prepareFile(files) {
  if (files.length > 1) {
    alert('Only one file allowed!');
    return;
  }

  const file = files[0];
  setVideoSource(file);
  sendProcessRequest(file);
  fileDrop.value = "";
}

/**
 * Updates the source of the video player
 */
function setVideoSource(file) {
  let video = document.getElementById('video-player');
  if (video == null) {
    console.log('No video player defined!');
    return;
  }

  let source = document.createElement('source');
  source.setAttribute('src', URL.createObjectURL(file));
  video.innerHTML = '';
  video.appendChild(source);
}

/**
 * Send a POST Ajax request to process the video
 */
function sendProcessRequest(file) {
  console.log('request sent');
}

/**
 * format bytes
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function activateButton(element) {
  element.classList.add('active');
  element.setAttribute('aria-pressed', 'true');
}

function deactivateButton(element) {
  element.classList.remove('active');
  element.setAttribute('aria-pressed', 'false');
}