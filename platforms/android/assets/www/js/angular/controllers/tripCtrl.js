/* trip controller with angularjs */
function tripCtrl($scope) {
    console.log("tripCtrl Loaded");
	$("#submit").button("disable");
	
	$scope.submit = function($event) {
		$scope.$emit('setTimeStampStart', new Date().getTime());
		checkValues();
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
	
	$scope.submit_end = function($event) {
		$scope.$emit('setTimeStampEnd', new Date().getTime());
	};
	
	$scope.$watch('trip.licenseplate + trip.cargo', function () {
		if($scope.trip.licenseplate != null && $scope.trip.cargo != null){
			$("#submit").button("enable");
			$("#submit").button("refresh");
		}
	});	
}


