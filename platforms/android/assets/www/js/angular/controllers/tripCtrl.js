/* trip controller with angularjs */
function tripCtrl($scope) {
    console.log("tripCtrl Loaded");	
	$("#submit").button("disable");

	
	/* 	Submit buttons */
	$scope.submit = function($event) {
		$scope.$emit('setTimeStampStart', new Date().getTime(),$scope.cargo,$scope.licenseplate,$scope.startComments);
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
		
	$scope.submit_end = function($event) {
		console.log("Submit_end funktion");
		$scope.$emit('setTimeStampEnd', new Date().getTime());
	};
	
	$scope.$on('resetTripValues',function(){
    	$scope.id 				= null;
		$scope.licenseplate 	= null;
		$scope.cargo			= null;
		$scope.timeStampStart 	= null;
		$scope.timeStampEnd 	= null;
		$scope.startPosition	= null;
		$scope.endPosition		= null;
		$scope.startComments	= null;
		$scope.endComments		= null;	
	})
	
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

	$scope.$watch('licenseplate + cargo', function () {
		if ($scope.licenseplate ==="" || $scope.cargo ==="" || !!$scope.licenseplate || !!$scope.cargo){
			$("#submit").button("disable");
			$("#submit").button("refresh");
			console.log("submitknap disabled")
			console.log("værdien fra disabled er : " + $scope.licenseplate + $scope.cargo)
		}
		if($scope.licenseplate && $scope.cargo){
			$("#submit").button("enable");
			$("#submit").button("refresh");
			console.log("submitknap enabled")
			console.log("værdien fra enabled er : " + $scope.licenseplate + $scope.cargo)

		}  
	});	
}


                         
