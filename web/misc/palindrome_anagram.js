var S = "aabcba";
var S_split = S.split("");
var len = S_split.length;
var count = 0;
for (var i = 0; i < len; i++) {
		var letter = S_split[0];
		S_split.splice(0, 1);
		var idx = S_split.indexOf(letter, 0);
		if (idx != -1) {
			count += 2;
			S_split.splice(idx, 1);
		}
		if (S_split.length == 0) {
			i = len;
		}
}
// We don't have a palindrome
if (count == len || count == len - 1) {
	alert("YUP");
}
else {
	alert("NOPE");
}