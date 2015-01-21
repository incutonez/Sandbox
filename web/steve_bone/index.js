$(document).ready(function() {
  $('.soundboard-knob').on('click', function() {
    console.log(this);
    if ($(this).hasClass('soundboard-knob-dot-clicked')) {
      $(this).removeClass('soundboard-knob-dot-clicked').addClass('soundboard-knob-dot-unclicked');
    }
    else {
      $(this).removeClass('soundboard-knob-dot-unclicked').addClass('soundboard-knob-dot-clicked');
    }
  });
});