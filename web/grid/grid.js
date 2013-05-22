function sorter(a, b) {
	return a.innerHTML.localeCompare(b.innerHTML, 'kn', {'sensitivity': 'base'});
}

$(document).ready(function() {
	$('.sorter').click(function(event) {
		var $target = $(event.target);
		$target.toggleClass('ascending');
		var list = $('.' + $target.attr('id')).get();
		if ($target.hasClass('ascending')) {			
			list.sort(sorter);
		}
		else {
			list.reverse(sorter);
		}
			
		for (var i = 0; i < list.length; i++) {
			list[i].parentNode.parentNode.appendChild(list[i].parentNode);
    }
	});
});