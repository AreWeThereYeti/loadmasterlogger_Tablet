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
		console.log($scope.trip.licenseplate + $scope.trip.cargo + " trip.licenseplate + trip.cargo ")
		if($scope.trip.licenseplate != null && $scope.trip.cargo != null){
			$("#submit").button("enable");
			$("#submit").button("refresh");
		}
	});
	
	$scope.$watch("trip.licenseplate", function(){
		console.log("scope.tripe.licenseplate er : " + $scope.trip.licenseplate);
	});
	
		
	/* 	Error Logging */
	function checkValues(){
		}if($scope.trip.licenseplate != null && $scope.trip.cargo !=null){
			alert("YEHAAAA");
			console.log("Yehhaaaa");

		}
/*
		
		if($scope.trip.cargo == null){
			console.log("intet er selected");
			alert("intet er selected");
		}else if($scope.trip.cargo != null){
			alert($scope.trip.licenseplate + " er selected");
            $submit.button('enable');
		}
*/
	}
/*
	     if (this.value == '') {
            $submit.button('disable');
        } else {
            $submit.button('enable');
        }
	
*/


