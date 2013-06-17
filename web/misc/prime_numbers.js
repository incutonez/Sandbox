var primes = [];
var A = 34;
var B = 37;
for (var i = A; i <= B; i++) {
		// not a prime
		if (i % 2 == 0) {
				continue;
		}
		else {
			var isPrime = true;
			for (var j = 3; j < Math.ceil(Math.sqrt(i)); j++) {
				if (i % j == 0) {
					isPrime = false;
					continue;
				}
			}
			if (isPrime) {
				primes.push(i);
			}
		}
}
alert(primes.length);