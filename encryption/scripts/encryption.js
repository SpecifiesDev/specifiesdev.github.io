
// I understand that this isn't secure, but this is just a basic algorithm with no intentions of being useful.

var running = false;

var vowels = ['e', 'i', 'o', 'u', 'a', 'y', 'E', 'I', 'O', 'U', 'A'];

var secondary = ['z', 'Z', 'x', 'X', 'v', 'V'];

var bannedCharacters = ['>', '<', '%', '&', '*', '^', '"'];

var upperCaseSymbols = ['@', '!', '#', '$', '(', ')', '_', '+', '[', ']', '{', '}', '|',':'];

var bannedTrue = false;



function algorithm() {
	running = true;

	var toEncrypt = getText();
	clearBox();

	console.log("Beginning the encryption of the text string '" + toEncrypt + "'");

	var output = "";
	for(var i = 0; i < toEncrypt.length; i++) {

			var c = toEncrypt.charAt(i);
			if(!bannedCharacters.includes(c)) {
			// Determine if the character is an integer, as our algorithm handles integers and chars seperately.
				if(Number.isInteger(parseInt(c))) {
					// Surround in dots.
					output += "*" + parseInt(c) + "-";
				} else {

					// Our character algorithm will be broken down into four parts.

					/*
					* Vowels. While y isn't considered a vowel we will consider it as one (as it is in some circumstances)
					* This provides us with six even characters, allowing us to create direct inverses. (e =i, o = u, a = y)
					* We will then add a multiplicity to the characters, then split the added string with a random integer.
					* In decryption, to detect this all we need to do is check if two voewls surround an integer, if they do
					* Remove the random integer, and find the voewl's inverse.
					* Effectively increases the size of one vowel to 3-4 characters.
					*/
					if(vowels.includes(c)) {
						var inverse = returnInverseVowel(c);
						output += inverse;
						output += returnRandom(11, 50);
						output += inverse;
					}

					// Secondary characters are uncommonly used english characters. Select random chars from "secondaryChars" array.
					// Since they're uncommon and lack many starting words, we can accurately assume that no words will contains uppercase letters.
					// "Semi-Lossy" encryption.
					else if(secondary.includes(c)) {
						output += randomSecondary(c);
					}

					
					//Capitilization. If a character is capitalized, and isn't a vowel, we decapitalize it and add %, # or &.
					else if(c == c.toUpperCase() && !upperCaseSymbols.includes(c) || c == ')') {
						var inverse = c.toLowerCase();
						output += randomCharacter() + inverse; 
					}

					// The rest. Basically, just place the rest of the letters in the encrypted string.
					else {
						output += c;
					}


				}
		} else {
			console.error("Banned Character: " + c);
			bannedTrue = true;
			break;
		}

	}
	
	if(!bannedTrue) {
		console.log("Output encryption: " + output);
		document.getElementById("finalOutput").innerHTML = output;
	}
	running = false;
	bannedTrue = false;
}













