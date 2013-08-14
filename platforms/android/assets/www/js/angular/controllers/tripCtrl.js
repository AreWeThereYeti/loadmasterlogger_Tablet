/* trip controller with angularjs */
function tripCtrl($scope) {
    console.log("tripCtrl Loaded");

	$scope.submit = function($event) {
		$scope.$emit('setTimeStampStart', new Date().getTime());
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
	
	$scope.submit_end = function($event) {
		$scope.$emit('setTimeStampEnd', new Date().getTime());
	};
}

