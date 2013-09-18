JSON.originalParse = JSON.parse;

JSON.parse = function(text){
	if (text) {
		return JSON.originalParse(text);
	} else {
		// no longer crashing on null value but just returning null
		return null;
	}
}
