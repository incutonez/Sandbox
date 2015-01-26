$(document).ready(function() {
  var KNOB_CLICKED_CSS = 'soundboard-knob-clicked';
  var KNOB_UNCLICKED_CSS = 'soundboard-knob-unclicked';
  function clickedItem() {
    var clickedItems = $('.' + KNOB_CLICKED_CSS);
    if (clickedItems.length) {
      var navItem = $('.' + KNOB_CLICKED_CSS).siblings('.nav-item');
      navItem.removeClass('highlighted');
      var navItemId = navItem.attr('id');
      $('#' + navItemId + '-content').addClass('hidden');
      $('.' + KNOB_CLICKED_CSS).removeClass(KNOB_CLICKED_CSS).addClass(KNOB_UNCLICKED_CSS);
    }
    var soundboardDiv = $(this).children('.soundboard-knob');
    if (!soundboardDiv.is(clickedItems)) {
      if (soundboardDiv.hasClass(KNOB_CLICKED_CSS)) {
        soundboardDiv.siblings('.nav-item').removeClass('highlighted');
        soundboardDiv.removeClass(KNOB_CLICKED_CSS).addClass(KNOB_UNCLICKED_CSS);
      }
      else {
        // Used to use these, but it caused issues in Chrome (might need them for older versions of browsers): webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd
        soundboardDiv.one('transitionend', function(e) {
          var navItem = soundboardDiv.siblings('.nav-item');
          navItem.addClass('highlighted');
          var navItemId = navItem.attr('id');
          $('#' + navItemId + '-content').removeClass('hidden');
        });
        soundboardDiv.removeClass(KNOB_UNCLICKED_CSS).addClass(KNOB_CLICKED_CSS);
      }
    }
  }
  $('.soundboard-nav').on('click', clickedItem);
});