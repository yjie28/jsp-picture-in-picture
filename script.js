const videoElement = document.getElementById('video');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const selectBtn = document.getElementById('select');

// Prompt to select media stream, pass to video element, then play
const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
    selectBtn.hidden = true;
    startBtn.hidden = false;
  } catch (error) {
    // catch error
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
  selectBtn.hidden = false;
  // Closes the Picture In Picture window
  document.exitPictureInPicture();
};

// Select
selectBtn.addEventListener('click', selectMediaStream);

// Start
startBtn.addEventListener('click', startPIP);

// Stop
stopBtn.addEventListener('click', stopPIP);
