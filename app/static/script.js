const selector = document.getElementById('video-selector');
const player = document.getElementById('video-player-div');

const fileDrop = document.getElementById('fileDrop');
fileDrop.addEventListener('change', (e) => {
  this.prepareFile(e.target.files);
  //selector.setAttribute('class', 'invisible');
  //player.setAttribute('class', 'visible');
  selector.style.display = 'none';
  player.style.display = 'block'; 
});

const goBack = document.getElementById('new-video');
goBack.addEventListener('click', (e) => {
  selector.style.display = 'block';
  player.style.display = 'none'; 
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