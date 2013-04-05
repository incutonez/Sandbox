$(document).ready(function() {
	$('#range').on('click', function(e) {
		var range = $(this).val();
		$('#table').children().remove();
		for (var i = range - 1000; i <= range; i++) {
			var symbol = String.fromCharCode('0x' + i);
			$('#table').append('<span class="column">' + symbol + '</span>');
		}
		
		$('.column').on('click', function(e) {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			var selected = $(this).text();
			alert('\\u' + selected.charCodeAt().toString(16));
		});
	});
});