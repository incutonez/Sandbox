$(document).ready(function() {
  var intervalMs = 45;
  function removeFaderLights(faders) {
    var j = 0;
    var faderLights = faders.siblings('.fader-lights');
    var faderLightsChildren = faderLights.children();
    function myDownInterval() {
      var child = $(faderLightsChildren[j++]);
      if (child.length) {
        child.hide();
      }
      else {
        clearInterval(intervalDownId);
      }
    }
    var intervalDownId = setInterval(myDownInterval, intervalMs);
    faders.addClass(FADER_OFF_CLS).removeClass(FADER_ON_CLS);
  }
  function addFaderLights(clickedFader) {    
    var i = 11;
    var faderLightChildren
    var faderLights = clickedFader.siblings('.fader-lights');
    if (faderLights) {
      faderLightChildren = faderLights.children();
      function myInterval() {
        var child = $(faderLightChildren[--i]);
        if (child.length) {
          child.show();
        }
        else {
          clearInterval(intervalId);
        }
      }
      var intervalId = setInterval(myInterval, intervalMs);
    }
  }
  var FADER_ON_CLS = 'fader-on';
  var FADER_OFF_CLS = 'fader-off';
  $('.fader').on('click', function(e) {
    var clickedFader = $(this);
    var onFaders = $('.' + FADER_ON_CLS);
    removeFaderLights(onFaders);
    if (clickedFader.is(onFaders)) {
      onFaders.addClass(FADER_OFF_CLS).removeClass(FADER_ON_CLS);
    }
    else {
      clickedFader.removeClass(FADER_OFF_CLS).addClass(FADER_ON_CLS);
      addFaderLights(clickedFader);
      /*clickedFader.one('transitionend', function(e) {
        
      });*/
    }
  });
});
