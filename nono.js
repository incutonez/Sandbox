$(document).ready(function() {
	$('#nonoSize').on('change', function(event) {
		$('#nonoGrid').children().remove();
		var size = $(this).val();
		for (var i = 0; i < size; i++) {
			var row = '<div id="row' + i + '" class="row">';
			for (var j = 0; j < size; j++) {
				row += '<canvas class="column colHover" width="20" height="20" oncontextmenu="return false;"></canvas>';
			}
			row += '</div>';
			$('#nonoGrid').append(row);
		}
		$('.row').css('width', size * 22 + 2 + 'px');
		
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