function sorter(a, b) {
	return a.innerHTML.localeCompare(b.innerHTML, 'kn', {'sensitivity': 'base'});
}

$(document).ready(function() {
	$('.sorter').click(function(event) {
		var $target = $(event.target);
		var list = $('.' + $target.attr('id')).get();
		if (!$target.hasClass('asc') || $target.hasClass('desc')) {
			list.sort(sorter);
      $('.asc').removeClass('asc');
      $('.desc').removeClass('desc');
      $target.addClass('asc');
      $target.removeClass('desc');
		}
		else {
			list.reverse(sorter);
      $('.asc').removeClass('asc');
      $('.desc').removeClass('desc');
      $target.removeClass('asc');
      $target.addClass('desc');
		}
			
		for (var i = 0; i < list.length; i++) {
			list[i].parentNode.parentNode.appendChild(list[i].parentNode);
    }
	});
});