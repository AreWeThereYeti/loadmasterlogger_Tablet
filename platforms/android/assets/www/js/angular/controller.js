/* User controller with angularjs */
function userCtrl($scope) {
    console.log("UserCtrl Loaded");
	
	$scope.trip =
    {
    	id 				: null,
		licenseplate 	: null,
		cargo			: null,
		timeStampStart 	: null,
		timeStampEnd 	: null,
		startPosition	: null,
		endPosition		: null,
		startComments	: null,
		endComments		: null	
	};
	
	$scope.$on('setStartPosition',function(ev,start_position){
		$scope.trip.startPosition=start_position;
	})
	
	$scope.$on('setEndPosition',function(ev,end_position){
		$scope.trip.endPosition=end_position;
	})
	
	$scope.$on('setTimeStampStart',function(ev,start_time_stamp){
		$scope.trip.timeStampStart=start_time_stamp;
	})
	
	$scope.$on('setTimeStampEnd',function(ev,end_time_stamp){
		$scope.trip.timeStampEnd=end_time_stamp;
	})
					
	$scope.submit_trip = function(){
		console.log('submit ran on userCxtrl');
		console.log($scope.trip);
	}
	
	/* 	Error Logging */
	
	var licenseplate = document.myForm.licenseplate;
	if(licenseplate.options[licenseplate.selectedIndex].value===null){
		console.log("intet er selected")
	}
	
	console.log("værdien af licenseplate value er : " + licenseplate.options[licenseplate.selectedIndex].value)
	
	if(licenseplate.options[licenseplate.selectedIndex].value !== null){
		console.log("Hvad er der nu i licenseplate.options : " + licenseplate.options[licenseplate.selectedIndex].value)
		console.log("licenseplate er : " + $scope.trip.licenseplate);
	}

}