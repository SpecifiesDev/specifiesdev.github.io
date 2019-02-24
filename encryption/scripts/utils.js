// utils

var chars = ['&', '#', '%'];

var secondaryChars = ['fF', 'mM', 'zZ'];


function getText() {
	return document.getElementById("toEncrypt").value;
}

function clearBox() {
	document.getElementById("toEncrypt").value = "";
}

function returnRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

function returnInverseVowel(vow) {
	if(vow == 'e') {
		return 'i';
	}
	if(vow == 'o') {
		return 'u';
	}
	if(vow == 'a') {
		return 'y';
	}
	if(vow == 'y') {
		return 'a';
	}
	if(vow == 'u') {
		return 'o';
	}
	if(vow == 'i') {
		return 'e';
	}
	if(vow == 'E') {
		return 'I';
	}
	if(vow == 'O') {
		return 'O';
	}
	if(vow == 'A') {
		return 'Y'
	}
	if(vow == 'Y') {
		return 'A'
	}
	if(vow == 'U') {
		return 'O';
	}
	if(vow == 'I') {
		return 'E';
	}

}

function randomCharacter() {
	return chars[Math.floor(Math.random()* chars.length)];
}

function randomSecondary(char) {
	if(char == 'Z' || char == 'z') {
		return secondaryChars[0];
	} 
	if(char == 'X' || char == 'x') {
		return secondaryChars[1];
	}
	if(char == 'V' || char == 'v') {
		return secondaryChars[2];
	}
}

function inverseSecondary(char) {

	console.log(char);
	if(char == 'f') {
		return 'z';
	}
	if(char == 'm') {
		return 'x';
	}
	if(char == 'z') {
		return 'v';
	}
}

function predict(iteration, pred, string) {

	var returnV = "";
	for(var i = iteration + 1; i < pred + 1; i++) {
		returnV += string.charAt(i);
	}

	return returnV;

}
