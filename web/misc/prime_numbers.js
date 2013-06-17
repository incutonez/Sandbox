$(document).ready(function() {
	$('#submit').on('click', function() {
		var A = $('#lower').val();
		var B = $('#upper').val();
		if (A != "" && B != "") {
			var primes = [];
			var primes_string = "";
			for (var i = A; i <= B; i++) {
				var isPrime = true;
				for (var j = 2; j <= Math.ceil(Math.sqrt(i)); j++) {
					if (i % j == 0) {
						isPrime = false;
						continue;
					}
				}
				if (isPrime) {
					primes.push(i);
					if (primes_string != "") {
						primes_string += ", " + i;
					}
					else {
						primes_string = i;
					}
				}
			}
			alert("You have " + primes.length + " prime numbers: " + primes_string);
		}
	});
});