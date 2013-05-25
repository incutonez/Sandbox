function sorter(a, b) {
	return a.innerHTML.localeCompare(b.innerHTML, 'kn', {'sensitivity': 'base'});
}

$(document).ready(function() {
	// Column sorting
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
	
	// Search filtering
	$('#search').on('keyup', function(event) {
		var $filter_text = $(this).val();
		// Every time a key is pressed, we remove the filtering class because the filter will change
		$('.filtered').removeClass('filtered');
		if ($filter_text) {
			// Find all divs that contain our filter text
			$('#rows > div:contains("' + $filter_text + '")').addClass('filtered');
			// In case we deleted some letters and no longer need to hide the row
			$('.filtered').removeClass('hidden');
			// Find all divs that don't contain our filter class and hide them
			$('#rows > div:not(.filtered)').addClass('hidden');
		}
		// If the search text is empty, remove all hidden rows
		else {
			$('.hidden').removeClass('hidden');
		}
	});
});