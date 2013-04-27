$(document).ready(function() {
	var json;
	$.getJSON('nono.json', function(data) {
		json = data;
	});
	
	$('#nonoSize').on('change', function(event) {
		$('#nonoGrid').children().remove();
		$('#rowNums').children().remove();
		$('#colBox').children('.colNums').remove();
		var size = $(this).val();
		var maxHeight = 0;
		var maxWidth = 0;
		var fontSize = 15;
		var widthPadding = 12;
		for (var i = 0; i < size; i++) {
			var row = '<div id="row' + i + '" class="row">';
			for (var j = 0; j < size; j++) {
				row += '<canvas class="column colHover" width="20" height="20" oncontextmenu="return false;"></canvas>';
			}
			row += '</div>';
			
			var rowElem = $('<div class="rowNums"></div>');
			var colElem = $('<div class="colNums"></div>');
			var c = json[size].column[i];
			var r = json[size].row[i];
			for (var idx in c) {
				colElem.append('<span class="colNumber">' + c[idx] + '</span>');
			}
			for (var idx in r) {
				rowElem.append('<span class="rowNumber">' + r[idx] + '</span>');
			}
			if (!maxHeight || maxHeight < c.length) {
				maxHeight = c.length;
			}
			if (!maxWidth || maxWidth < r.length) {
				maxWidth = r.length;
			}
			$('#rowNums').append(rowElem);
			$('#colBox').append(colElem);
			$('#nonoGrid').append(row);
		}
		var rowWidth = $('.rowNums').css('width');
		$('.rowNums').css({
			width: (maxWidth * fontSize) + (widthPadding * maxWidth) + 'px'
		});
		$('.colNums').css({
			height: ((maxHeight + 2) * fontSize) - 1 + 'px'
		});
		$('#colNums').css({
			height: ((maxHeight + 2) * fontSize) + 'px'
		});
		$('.row').css('width', size * 22 + 2 + rowWidth + 'px');
		$('#spacer').css({
			width: (maxWidth * fontSize) + (maxWidth * widthPadding) + 'px',
			height: ((maxHeight + 2) * fontSize) - 1 + 'px'
		});
		$('#colBox').css({
			height: ((maxHeight + 2) * fontSize) - 1 + 'px'
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