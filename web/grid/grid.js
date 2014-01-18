function sorter(a, b) {
  log();
	return a.innerHTML.localeCompare(b.innerHTML, 'kn', {'sensitivity': 'base'});
}

$(document).ready(function() {
	var pageSize = 10;
	var page = 0;
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
	
	$('#rows > * :gt(' + (pageSize - 1) +')').addClass('next');
	
	$('#next').on('click', function(e) {
		var nextRows = $('#rows > div.next').slice(0, pageSize - 1);
		if (nextRows.length != 0) {
			$('#rows > div:visible').addClass('prev');
			nextRows.removeClass('next');
			page++;
		}
	});
	
	$('#prev').on('click', function(e) {
		var prevRows = $('#rows > div.prev').slice((page - 1) * pageSize, (page * pageSize) - 1);
		if (prevRows.length != 0) {
			$('#rows > div:visible').addClass('next');
			prevRows.removeClass('prev');
			page--;
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
	
	// TODO: Add pagination
	// TODO: Read initial grid data from JSON
	// TODO: Allow for contenteditable?
});