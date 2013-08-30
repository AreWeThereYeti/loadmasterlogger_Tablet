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
		$scope.start_adress		= null;
		$scope.end_adress 		= null;
		if($("select").is(':visible')){
			console.log("select is visible");
			$("select").prop("selectedIndex",0);
			$('select').selectmenu('refresh', true);
		}
	})
	
	$scope.$watch('license_plate + cargo + trip.start_location', function () {
		if ($scope.license_plate ==="" || $scope.cargo ==="" || !!$scope.license_plate || !!$scope.cargo || $scope.license_plate =="0" || $scope.cargo =="0"){
/* 			if($("#submit_start").is(':visible')){	 */
				console.log("submit_start is visible and disabled");
				$("#submit_start").button("disable");
				$("#submit_start").button("refresh");
/* 			} */
		}
		
		console.log("start adress er " + $scope.trip.start_adress)
		console.log("start location er " + $scope.trip.start_location)
		
		if($scope.license_plate && $scope.cargo && $scope.license_plate != "0" && $scope.cargo != "0"){
/* 			if( $scope.trip.start_location == null || $scope.trip.start_adress == ""){ */
				console.log("checking if adress is visible. trip.start_location er" + $scope.trip.start_location + "og  trip.start_adress er " + $scope.trip.start_adress)
/* 				if($("#submit_start").is(':visible')){ */
					console.log("submit_start is visible and enabled");
					$("#submit_start").button("enable");
					$("#submit_start").button("refresh");
/* 				} */
/* 			} */
		}			
	});

/*
	$scope.$watch('trip.end_location + trip.end_adress', function () {
		console.log('tip.end_location or trip.end_adress changed')	
		if( $scope.trip.end_location != null || $scope.trip.end_adress != null){
			if($("#submit_end").is(':visible')){
				console.log("submit_end is visible");
			    $("#submit_end").button("enable");
				$("#submit_end").button("refresh");
			}
		}
	});
*/
}              
