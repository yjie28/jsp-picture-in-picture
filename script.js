/*
    logic to be implemented: 
    maybe better for user to select for the browser to prompt, 
    if the user selects "cancel", the "start" button should be disabled

*/

const videoElement = document.getElementById('video');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const reselectBtn = document.getElementById('reselect');

// Prompt to select media stream, pass to video element, then play
const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // catch error
    console.log(error);
  }
};

stopStreamedVideo = (videoElement) => {
  const mediaStream = videoElement.srcObject;
  const tracks = mediaStream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });
};

// Start Picture-in-Picture
const startPIP = async () => {
  startBtn.hidden = true;
  stopBtn.hidden = false;
  await videoElement.requestPictureInPicture();
};

// Stop Picture-in-Picture
const stopPIP = () => {
  stopStreamedVideo(videoElement);
  stopBtn.hidden = true;
  reselectBtn.hidden = false;
};

// Propmpts to select media stream again
const reselectMediaStream = () => {
  reselectBtn.hidden = true;
  stopBtn.hidden = false;
  selectMediaStream();
};

// Start
startBtn.addEventListener('click', startPIP);

// Stop
stopBtn.addEventListener('click', stopPIP);

// Reselect
reselectBtn.addEventListener('click', reselectMediaStream);

// On Load
selectMediaStream();
