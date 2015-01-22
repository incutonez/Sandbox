$(document).ready(function() {
  var KNOB_CLICKED_CSS = 'soundboard-knob-clicked';
  var KNOB_UNCLICKED_CSS = 'soundboard-knob-unclicked';
  function clickedItem() {
    var clickedItems = $('.' + KNOB_CLICKED_CSS);
    if (clickedItems.length) {
      $('.' + KNOB_CLICKED_CSS).siblings('.nav-item').removeClass('highlighted');
      $('.' + KNOB_CLICKED_CSS).removeClass(KNOB_CLICKED_CSS).addClass(KNOB_UNCLICKED_CSS);
    }
    var soundboardDiv = $(this).children('.soundboard-knob');
    if (!soundboardDiv.is(clickedItems)) {
      if (soundboardDiv.hasClass(KNOB_CLICKED_CSS)) {
        soundboardDiv.siblings('.nav-item').removeClass('highlighted');
        soundboardDiv.removeClass(KNOB_CLICKED_CSS).addClass(KNOB_UNCLICKED_CSS);
      }
      else {
        soundboardDiv.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
          soundboardDiv.siblings('.nav-item').addClass('highlighted');
        });
        soundboardDiv.removeClass(KNOB_UNCLICKED_CSS).addClass(KNOB_CLICKED_CSS);
      }
    }
  }
  $('.soundboard-nav').on('click', clickedItem);
});