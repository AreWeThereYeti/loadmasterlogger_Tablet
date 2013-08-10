/* Android fejl? http://samritchie.net/2011/04/01/uncaught-illegal-access-exception-in-android-browser-on-json-parse/
JSON.originalParse = JSON.parse;

JSON.parse = function(text){
	if (text) {
		return JSON.originalParse(text);
	} else {
		// no longer crashing on null value but just returning null
		return null;
	}
}
*/

function tripCtrl($scope) {
  $scope.submit = function($event) {
  	$event.preventDefault();
	console.log($scope.licenseplate, $scope.cargo, $scope.start_comments, $scope.end_comments);
	$.mobile.changePage("#two");
  };
}