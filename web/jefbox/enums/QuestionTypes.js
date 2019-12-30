// Truly make it a constant by freezing it
const QuestionTypes = Object.freeze({
  TEXT: 1,
  MULTIPLE_CHOICE: 2,
  IMAGE: 3,
  AUDIO: 4,
  VIDEO: 5,
  DRAWING: 6
});

module.exports = QuestionTypes;