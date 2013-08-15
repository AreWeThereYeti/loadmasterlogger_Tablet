function mapCtrl($scope,$rootScope) {
	console.log("mapCtrl Loaded");
	
	/* 			Initialize map */
  $scope.initialize = function(latitude, longitude) {
  	 console.log('initialize ran')
   	$scope.markerPosition = new google.maps.LatLng(latitude, longitude);
    $scope.mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 12,
      streetViewControl: false,
      maptypecontrol :false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
	
/* 	Add map to #map_canvas */
    $scope.map = new google.maps.Map(document.getElementById($scope.map_id), $scope.mapOptions);
	window.map=$scope.map
    
/* 	      Place marker on map_start */
	$scope.marker = new google.maps.Marker({
	   position: $scope.markerPosition,
	   draggable:true,
	   animation: google.maps.Animation.DROP,
	   map: $scope.map,
	   title: "Start Position"
	});
	
	$scope.$emit($scope.map_set_position, new google.maps.LatLng(latitude, longitude));

	// adds a listener to the marker
	// gets the coords when drag event ends
	// then updates the input with the new coords
/*
	google.maps.event.addListener($scope.marker, 'dragend', function(event) {
		console.debug('new position is '+event.latLng.lat()+' / '+event.latLng.lng());
	});
*/
	
/* 	google.maps.event.trigger($scope.map,'resize'); */
	
  }
  
  	$scope.drawCurrentPosition = function(){
  		console.log('drawCurrentPosition ran')
  		navigator.geolocation.getCurrentPosition(function success(position){
			$scope.$apply(function(scope){
		  	scope.getPositionSuccess(position)
		  })
	  }, 
	  function error(error){
		  $scope.$apply(function(scope){
			  scope.getPositionError(error)
		  })
	  }, { maximumAge: 5000, timeout: 15000, enableHighAccuracy: true });
  }
  
  	$scope.getPositionSuccess = function(position){
  		console.log('getPositionSuccess ran')
  		$scope.initialize(position.coords.latitude, position.coords.longitude)
  }
  
  $scope.getPositionError = function(err){
	  console.log(err)
  }
	
}