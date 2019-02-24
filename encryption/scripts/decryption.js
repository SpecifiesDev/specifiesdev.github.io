

var running = false;

var vowels = ['e', 'i', 'o', 'u', 'a', 'y', 'E', 'I', 'O', 'U', 'A'];

var secondary = ['z', 'Z', 'x', 'X', 'v', 'V'];

var bannedCharacters = ['>', '<', '%', '&', '*', '^', '"'];

var upperCaseSymbols = ['@', '!', '#', '$', '(', ')', '_', '+', '[', ']', '{', '}', '|',':'];

var bannedTrue = false;

var skip = 0;


function algorithm() {

	running = true;
	var toDecrypt = getText();
	clearBox();

	console.log("Beginning the decryption of the text string '" + toDecrypt + "'");

	var output = "";

	for(var i = 0; i < toDecrypt.length; i++) {

		var toGet = i + skip;
		var c = toDecrypt.charAt(toGet);


		if(vowels.includes(c)) {
			// If vowels, return inverse of first vowel and skip the next three letters.
			skip += 3;
			output += returnInverseVowel(c);

		} 
		// next 3 else ifs involve secondaryChar parsing, just checking if the next is equal to the inverse of the first
		else if(c == 'f' && toDecrypt.charAt(toGet + 1).toUpperCase() == 'F') {
			output += 'z';
			skip += 1;
		} else if(c == 'm' && toDecrypt.charAt(toGet + 1).toUpperCase() == 'M') {
			output += 'x';
			skip += 1;
		} else if(c == 'z' && toDecrypt.charAt(toGet + 1).toUpperCase() == 'Z') {
			output += 'v';
			skip += 1;
		} else if(chars.includes(c)) {
			// If special character, just get the uppercase of the next character
			output += toDecrypt.charAt(toGet + 1).toUpperCase();
			skip += 1;
		} else if(c == '*') {
			// If *, there's a number
			output += toDecrypt.charAt(toGet + 1);
			skip += 1;
		} else {
			// The rest of the excluded characters.
			output += c;
		}


	}

	console.log("Decrypted text: " + output);
	document.getElementById("finalOutput").innerHTML = output;
	bannedTrue = false;
	running = false;
	skip = 0;

}