function ready() {
	var p1 = new Person('jef', '2222');
	var p1Div = document.getElementById('p1');
	var p2Div = document.getElementById('p2');
	var p1Info = p1.getInformation();
	p1.changeName('blah');
	var p2Info = p1.getInformation();
	p1Div.innerHTML = 'Name: ' + p1Info.name + ' <br />Age: ' + p1Info.age;
	p2Div.innerHTML = 'Name: ' + p2Info.name + ' <br />Age: ' + p2Info.age;
}