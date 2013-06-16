var primes = [];
var A = 11;
var B = 19;
for (var i = A; i <= B; i++) {
		// not a prime
		if (i % 2 == 0) {
				continue;
		}
		else if (i % 3 == 0) {
			continue;
		}
		else {
				var myStr = Math.sqrt(i).toString();
				// not a prime because it's a perfect square
				if (myStr.indexOf('.') == -1) {
						continue;
				}
				primes.push(i);
		}
}
alert(primes.length);