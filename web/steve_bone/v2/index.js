$(document).ready(function() {
  var intervalMs = 45;
  var msie = window.navigator.userAgent.indexOf('MSIE ');
  function faderFinished(clickedFader) {    
    clickedFader.parent().siblings('.tape').addClass('tape-clicked');
    var clickedFaderId = clickedFader.attr('id');
    $('#' + clickedFaderId + '-content').removeClass('hidden').addClass('selected-content');
  }
  function removeFaderLights(faders) {
    var i = 0;
    var faderLights = faders.siblings('.fader-lights');
    var faderLightsChildren = faderLights.children();
    function myDownInterval() {
      var child = $(faderLightsChildren[i]);
      if (child.length) {
        if (i < 2) {
          child.removeClass('fader-light-red');
        }
        else if (i < 5) {
          child.removeClass('fader-light-yellow');
        }
        else {
          child.removeClass('fader-light-green');
        }
        i++;
      }
      else {
        clearInterval(intervalDownId);
      }
    }
    faders.addClass(FADER_OFF_CLS).removeClass(FADER_ON_CLS);
    var intervalDownId = setInterval(myDownInterval, intervalMs);
  }
  function addFaderLights(clickedFader) {    
    var i = 10;
    var faderLightChildren
    var faderLights = clickedFader.siblings('.fader-lights');
    if (faderLights) {
      faderLightChildren = faderLights.children();
      function myInterval() {
        var child = $(faderLightChildren[i]);
        if (child.length) {
          if (i > 4) {
            child.addClass('fader-light-green');
          }
          else if (i > 1) {
            child.addClass('fader-light-yellow');
          }
          else {
            child.addClass('fader-light-red');
          }
          i--;
        }
        else {
          // Check if we're dealing with IE9-
          if (msie > 0) {
            faderFinished(clickedFader);
          }
          clearInterval(intervalId);
        }
      }
      var intervalId = setInterval(myInterval, intervalMs);
      /* Call the interval function twice to populate two lights, so we don't
       * see a lag in the colors lighting up */
      myInterval();
      clickedFader.removeClass(FADER_OFF_CLS).addClass(FADER_ON_CLS);
    }
  }
  var FADER_ON_CLS = 'fader-on';
  var FADER_OFF_CLS = 'fader-off';
  $('.fader').on('click', function(e) {
    var clickedFader = $(this);
    var onFaders = $('.' + FADER_ON_CLS);
    $('.selected-content').removeClass('selected-content').addClass('hidden');
    $('.tape-clicked').removeClass('tape-clicked');
    removeFaderLights(onFaders);
    if (clickedFader.is(onFaders)) {
      onFaders.addClass(FADER_OFF_CLS).removeClass(FADER_ON_CLS);
    }
    else {
      addFaderLights(clickedFader);
      clickedFader.one('transitionend', function(e) {
        faderFinished(clickedFader);
      });
    }
  });
});
