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
	
	$scope.$on('setTimeStampStart',function(ev,start_time_stamp){
		$scope.trip.timeStampStart=start_time_stamp;
	})
	
	$scope.$on('setTimeStampEnd',function(ev,end_time_stamp){
		$scope.trip.timeStampEnd=end_time_stamp;
	})
			
	console.log($scope.trip)
		
	$scope.submit_trip = function(){
		console.log('submit ran on userCxtrl')
		console.log($scope.trip)
	}

}