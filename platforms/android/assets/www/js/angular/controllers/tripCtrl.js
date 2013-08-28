/* trip controller with angularjs */
function tripCtrl($scope, $http) {
	$("#submit_start").button("disable");
	
	/* 	Submit buttons */
	$scope.submit = function($event) {
		$scope.$emit('setstart_timestamp', new Date().getTime(),$scope.cargo,$scope.license_plate,$scope.start_comments);
		$event.preventDefault();
		$.mobile.changePage("#two");
	};
		
	$scope.submit_end = function($event) {
		console.log("Submit_end funktion");
		$scope.$emit('setend_timestamp', new Date().getTime());
		$("#submit_start").button("disable");
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
		$("select").prop("selectedIndex",0);
		$('select').selectmenu('refresh', true);
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
	
	console.log($scope.trip.start_location);

	$scope.$watch('license_plate + cargo + trip.start_location', function () {
/* 	console.log($scope.trip.start_location); */
		if ($scope.license_plate ==="" || $scope.cargo ==="" || !!$scope.license_plate || !!$scope.cargo || $scope.license_plate =="0" || $scope.cargo =="0"){
			$("#submit_start").button("disable");
			$("#submit_start").button("refresh");
		}
		if($scope.license_plate && $scope.cargo && $scope.license_plate != "0" && $scope.cargo != "0" && $scope.trip.start_location != null ){
			$("#submit_start").button("enable");
			$("#submit_start").button("refresh");

		}  
	});	
}                
