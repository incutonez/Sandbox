$(document).ready(function() {
  $('.soundboard-knob').on('click', function() {
    if ($(this).hasClass('soundboard-knob-dot-clicked')) {
      $(this).siblings('span').removeClass('highlighted');
      $(this).removeClass('soundboard-knob-dot-clicked').addClass('soundboard-knob-dot-unclicked');
    }
    else {
      $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        $(this).siblings('span').addClass('highlighted');
      });
      $(this).removeClass('soundboard-knob-dot-unclicked').addClass('soundboard-knob-dot-clicked');
    }
  });
});