// Truly make it a constant by freezing it
const UploadTypes = Object.freeze({
  IMAGE: 1,
  IMAGE_URL: 2,
  AUDIO: 3,
  AUDIO_URL: 4,
  VIDEO: 5,
  VIDEO_URL: 6
});

module.exports = UploadTypes;