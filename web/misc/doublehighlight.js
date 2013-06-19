function loaded() {
	/*var parent = document.getElementById('parent');
	parent.onmouseenter = function(event) {
		console.log(event.target);
	};
	parent.onmouseleave = function(event) {
		console.log(event.target);
	};*/
	
	var rows = document.getElementsByClassName('row');
	for (var i = 0; i < rows.length; i++) {
		rows[i].onmouseenter = function(event) {
			var splits = event.target.className.split(" ");
			var elems = document.getElementsByClassName(splits[splits.length - 1]);
			for (var j = 0; j < elems.length; j++) {
				elems[j].className += " hover";
			}
		};
		
		rows[i].onmouseleave = function(event) {
			var hovers = document.getElementsByClassName('hover');
			var len = hovers.length;
			for (var j = 0; j < len; j++) {
				hovers[0].className = hovers[0].className.replace(/\shover(\s|$)/, '');
			}
		};
	}
}