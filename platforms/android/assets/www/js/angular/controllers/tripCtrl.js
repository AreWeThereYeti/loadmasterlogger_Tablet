/* trip controller with angularjs */
function tripCtrl($scope, $http) {

	/* 	Submit buttons */
	$scope.submit = function($event) {
		$scope.$emit('setstart_timestamp', new Date().getTime(),$scope.cargo,$scope.license_plate,$scope.start_comments);
		$event.preventDefault();
		$.mobile.changePage("#two");

	};
		
	$scope.submit_end = function($event) {
		console.log("Submit_end funktion");
		$scope.$emit('setend_timestamp', new Date().getTime());
		$event.preventDefault();
		$.mobile.changePage("#three");
	    $("#submit_end").button("enable");
		$("#submit_end").button("refresh");
		$("#submit_start").button("enable");
		$("#submit_start").button("refresh");

	};
	
			/* 	Set positions */
	$scope.$on('setstart_location',function(ev,start_location){
		$scope.start_location=start_location;
	});
	
	$scope.$on('setend_location',function(ev,end_location){
		$scope.end_location=end_location;
	})
	
	/* 	Set timeStamps */
	$scope.$on('setstart_timestamp',function(ev,start_time_stamp, cargo,license_plate, start_comments){
		$scope.start_timestamp	= start_time_stamp;
		$scope.license_plate 	= license_plate;
		$scope.start_comments 	= start_comments;
		$scope.cargo 			= cargo;
		$scope.AddStartValuesToDB();
	})
	
	$scope.$on('setend_timestamp',function(ev,end_time_stamp){
		$scope.end_timestamp=end_time_stamp;
		$scope.AddEndValuesToDB();

	})
	
	$scope.$watch('license_plate + cargo + start_location + start_address', function () {
		if($("#home").is(':visible')){
			console.log("Vi er på side 1 ")
			console.log($scope.cargo)
			if(!!$scope.license_plate && !!$scope.cargo && $scope.license_plate != "0" && $scope.cargo != "0"){
				if(!!$scope.start_location || (!!$scope.start_address && $scope.start_address !="")){
					console.log("aktiverer knapper på side 1 ")
					$("#submit_start").button("enable");
					$("#submit_start").button("refresh");			
				}
			}
			else if($scope.license_plate === "0" || $scope.cargo === "0" || $scope.license_plate == null || $scope.cargo == null) {
					console.log("Deaktiverer knapper på side 1 ")
					$("#submit_start").button("disable");
					$("#submit_start").button("refresh");		
			}
		}			
	});
	
	$scope.$watch('end_location + end_address', function () {
		if($("#two").is(':visible')){
			console.log("vi er på side 2")
			if(!!$scope.end_location || (!!$scope.end_address && $scope.end_address !="")){
				console.log("aktivere knapper på side 1 ")
			    $("#submit_end").button("enable");
				$("#submit_end").button("refresh");
			}
		}
	});
}             