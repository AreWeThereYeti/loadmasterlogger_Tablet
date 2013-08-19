/* trip controller with angularjs */
function tripCtrl($scope) {
    console.log("tripCtrl Loaded");
	$("#submit").button("disable");
	
	
	/* 	Submit buttons */
	$scope.submit = function($event) {
		$scope.$emit('setTimeStampStart', new Date().getTime());
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
		
	$scope.submit_end = function($event) {
		$scope.$emit('setTimeStampEnd', new Date().getTime());
		AddValuesToDB();
	};
	
	$scope.$on('setAccuracy',function(ev,setAccuracy){
		if(setAccuracy > 100){
			console.log("Accuracy er : " + setAccuracy)
		}else if(setAccuracy > 50 && setAccuracy < 99){
			console.log("Accuracy er : " + setAccuracy)
		}else if(setAccuracy < 49){
			console.log("Accuracy er : " + setAccuracy)
		}
	})
	
	
	/* 	Watching variables  */
	$scope.$watch('position.coords.accuracy', function(){
		
	})

	$scope.$watch('trip.licenseplate + trip.cargo', function () {
		if($scope.trip.licenseplate != null && $scope.trip.cargo != null){
			$("#submit").button("enable");
			$("#submit").button("refresh");
		}
	});	
}


                         
