// Native JS approach... fastest (according to my jsPerf http://jsperf.com/removeclass-vs-native-js-remove-class/2)
function loaded() {	
	var rows = document.getElementsByClassName('row');
	function addHighlight(elem, className) {
		var row = elem.className.match(/row-[\d]+/);
		var elems = document.getElementsByClassName(row[0]);
		for (var j = 0; j < elems.length; j++) {
			elems[j].className += " " + className;
		}
	}
	
	function removeHighlight(className) {
		var hovers = document.getElementsByClassName(className);
		var len = hovers.length;
		for (var j = 0; j < len; j++) {
			hovers[0].className = hovers[0].className.replace(new RegExp('\\s' + className + '(\\s|$)'), ' ');
		}
	}
	
	for (var i = 0; i < rows.length; i++) {
		rows[i].onmouseenter = function(event) {
			addHighlight(this, 'hover');
		};
		
		rows[i].onmouseleave = function(event) {
			removeHighlight('hover');
		};
		
		rows[i].onclick = function(event) {
			removeHighlight('selected');
			addHighlight(this, 'selected');
		};
	}
}

// jQuery approach (slowest)
/*$(document).ready(function() {
	$('.row').on('mouseenter', function(event) {
		var row = this.className.match(/row-[\d]+/);
		$('.' + row).addClass('hover');
	});
	
	$('.row').on('mouseleave', function(event) {
		$('.hover').removeClass('hover');
	});
});*/

// Hybrid approach (basically as fast as native JS approach)
/*$(document).ready(function() {
	var rows = document.getElementsByClassName('row');
  for (var i = 0; i < rows.length; i++) {
    rows[i].onmouseenter = function(event) {
      var row = this.className.match(/row-[\d]+/);
      $('.' + row[0]).addClass('hover');
    };

		rows[i].onmouseleave = function(event) {
			$('.hover').removeClass('hover');
		};
	}
});*/