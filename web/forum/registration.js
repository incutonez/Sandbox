$(document).ready(function() {
	$('#submit-button').on('click', function() {
		//ajax
		var obj = {
			username: $('#username').val(),
			password: CryptoJS.MD5($('#password').val()).toString(),
			email: $('#email').val(),
			name: $('#name').val()
		};
		$.post('index.php/api/users', obj, function(data) {
			alert(data);
		});
	});
});
