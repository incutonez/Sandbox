// Truly make it a constant by freezing it
const UploadTypes = Object.freeze({
  AUDIO_URL: 1,
  IMAGE_URL: 2,
  VIDEO_URL: 3,
  FILE: 4
});

module.exports = UploadTypes;