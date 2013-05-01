function Person(name, age) {
	var name = name;
	var age = age;
	
	return {
		getInformation: function() {
			return {'name': name, 'age': age};
		},
		changeName: function(newName) {
			name = newName;
		}
	}
}