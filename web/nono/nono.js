$(document).ready(function() {
	var json = {
		"columns": {"col0": [1, 2, 3, 4], "col1": [1, 1], "col2": [2, 4, 4, 4, 4], "col3": [10], "col4": [6, 6]},
		"rows": {"row0": [1, 2, 3], "row1": [2, 2, 3], "row2": [10], "row3": [2, 3, 1], "row4": [1, 1]}
	};
	$('#nonoSize').on('change', function(event) {
		$('#nonoGrid').children().remove();
		$('#rowNums').children().remove();
		$('#colNums').children('.colNums').remove();
		var size = $(this).val();
		for (var i = 0; i < size; i++) {
			var row = '<div id="row' + i + '" class="row">';
			for (var j = 0; j < size; j++) {
				row += '<canvas class="column colHover" width="20" height="20" oncontextmenu="return false;"></canvas>';
			}
			row += '</div>';
			$('#rowNums').append('<div class="rowNums"></div>');
			$('#colNums').append('<div class="colNums"></div>');
			$('#nonoGrid').append(row);
		}
		var rowWidth = $('.rowNums').css('width');
		$('.rowNums').css({
			width: '40px'
		});
		$('.row').css('width', size * 22 + 2 + rowWidth + 'px');
		$('#spacer').css({
			width: rowWidth,
			height: '39px'
		});
		
		$('.column').on('mousedown', function(event) {
			var ctx = this.getContext('2d');
			switch(event.which) {
				case 1:
					ctx.clearRect(0, 0, 20, 20);
					if ($(this).hasClass('black'))
						$(this).removeClass('black').addClass('white').addClass('colHover');
					else
						$(this).removeClass('white').addClass('black');
					break;
				case 3:
					$(this).removeClass('black').addClass('colHover');
					if ($(this).hasClass('diag')) {
						$(this).removeClass('diag');
						ctx.clearRect(0, 0, 20, 20);
					}
					else {
						$(this).addClass('diag');
						ctx.strokeStyle = 'red';
						ctx.beginPath();
						ctx.moveTo(0, 0);
						ctx.lineTo(20, 20);
						ctx.moveTo(0, 20);
						ctx.lineTo(20, 0);
						ctx.stroke();
					}
					break;
			}
			event.preventDefault();
		});
	});
});