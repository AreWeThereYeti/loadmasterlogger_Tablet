/* trip controller with angularjs */
function tripCtrl($scope, $http) {
	if($("#home").is(':visible')){
		$("#submit_start").button("disable");
		}
		
	if($("#two").is(':visible')){
		$("#submit_end").button("disable");
	}
	
	/* 	Submit buttons */
	$scope.submit = function($event) {
		$scope.$emit('setstart_timestamp', new Date().getTime(),$scope.cargo,$scope.license_plate,$scope.start_comments);
		$event.preventDefault();
		$.mobile.changePage("#two");

	};
		
	$scope.submit_end = function($event) {
		console.log("Submit_end funktion");
		$scope.$emit('setend_timestamp', new Date().getTime());
/* 		$("#submit_start").button("disable"); */
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
		$scope.start_address		= null;
		$scope.end_address 		= null;
		if($("select").is(':visible')){
			console.log("select is visible");
			$("select").prop("selectedIndex",0);
			$('select').selectmenu('refresh', true);
		}
	})
	
	
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
			if(!!$scope.license_plate && !!$scope.cargo && $scope.license_plate != "0" && $scope.cargo != "0"){
				if(!!$scope.start_location || (!!$scope.start_address && $scope.start_address !="")){
					$scope.triggerButtonRefresh("#submit_start")			
				}else{
					alert('cant trigger refresh yet')
				}
			}
		}			
	});

	$scope.$watch('end_location + end_address', function () {
		console.log('trip.end_location or trip.end_address changed')	
		if( $scope.end_location != null || $scope.end_address == ""){
			if($("#two").is(':visible')){
/* 			    $scope.triggerButtonRefresh("#submit_end"); */
			}
		}
	});
	
}              

/* $scope.trip.end_address.value.length */