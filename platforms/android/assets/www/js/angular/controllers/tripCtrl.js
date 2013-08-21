/* trip controller with angularjs */
function tripCtrl($scope, $http) {

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
		
		
/* 		AJAX */
		$.ajax({
		  type: "POST",
		  url: 'http://192.168.1.33:3000/api/v1/trips',
		  data:{
		     access_token:"6d21491d136311b69181b9ed722b5f40",
		     trips:[
		        {
		          license_plate:"dk 344 543",
  		           cargo:"sand",
		        },
		        {
		          license_plate:"æå 344 543",
		          cargo:"grus"
		        },
		     ]
		  },
		  success: function(){console.log('success')},
		  error:function(err){console.log(err)}
		});
		
/* 		ANGULAR HTTP */
	    $scope.postToServer = function() {
	        $http({
	            method : 'POST',
	            url: 'http://192.168.1.33:3000/api/v1/trips',
	            url : '/create',
	            data:{
			     access_token:"6d21491d136311b69181b9ed722b5f40",
			     trips:[
			        {
			          license_plate:"dk 344 543",
	  		           cargo:"sand",
			        },
			        {
			          license_plate:"æå 344 543",
			          cargo:"grus"
			        },
			     ]
			  },
			success: function(){console.log('success')},
			error:function(err){console.log(err)}
	        })
	    }
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


                         
