/* trip controller with angularjs */
function tripCtrl($scope, $http) {

    console.log("tripCtrl Loaded");	
	$("#submit").button("disable");
	
	/* 	Submit buttons */
	$scope.submit = function($event) {
		$scope.$emit('setstart_timestamp', new Date().getTime(),$scope.cargo,$scope.license_plate,$scope.start_comments);
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
		
	$scope.submit_end = function($event) {
		console.log("Submit_end funktion");
		$scope.$emit('setend_timestamp', new Date().getTime());
		
/* 		syncToDatabase(); */
		$.ajax({
		  type: "POST",
		  url: 'http://10.0.0.71:3000/api/v1/trips',
		  data:{
		     access_token:"6d21491d136311b69181b9ed722b5f40",
		     trips:[$scope.trip]
		  },
		  success: function(){console.log('success')},
		  error:function(err){console.log(err)}
		}); 
	};
	
	$scope.$on('resetTripValues',function(){
		$scope.license_plate 	= null;
		$scope.cargo			= null;
		$scope.start_timestamp 	= null;
		$scope.end_timestamp 	= null;
		$scope.start_location	= null;
		$scope.end_location		= null;
		$scope.start_comments	= null;
		$scope.end_comments		= null;	
	})
	
	$scope.$on('setAccuracy',function(ev,setAccuracy){
		if(setAccuracy > 100){
			console.log("Accuracy er : " + setAccuracy)
		}else if(setAccuracy > 50 && setAccuracy < 99){
			console.log("Accuracy er : " + setAccuracy);;
		}else if(setAccuracy < 49){
			console.log("Accuracy er : " + setAccuracy);
		}
	})
	
	/* 	Watching variables  */
	$scope.$watch('position.coords.accuracy', function(){
		
	})

	$scope.$watch('license_plate + cargo', function () {
		if ($scope.license_plate ==="" || $scope.cargo ==="" || !!$scope.license_plate || !!$scope.cargo){
			$("#submit").button("disable");
			$("#submit").button("refresh");
			console.log("submitknap disabled");
			console.log("værdien fra disabled er : " + $scope.license_plate + $scope.cargo);
		}
		if($scope.license_plate && $scope.cargo){
			$("#submit").button("enable");
			$("#submit").button("refresh");
			console.log("submitknap enabled");
			console.log("værdien fra enabled er : " + $scope.license_plate + $scope.cargo)

		}  
	});	
}


                         
