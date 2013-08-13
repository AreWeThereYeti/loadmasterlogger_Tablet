/* trip controller with angularjs */
function tripCtrl($scope) {

    $scope.cargo = null;
    $scope.licenseplate = null;

    console.log("tripCtrl Loaded");
	$scope.submit = function($event) {
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
}

