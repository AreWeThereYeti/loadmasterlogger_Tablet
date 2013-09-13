

function mapCtrl($scope,$rootScope) {
	console.log("mapCtrl Loaded");
		
	/* 			Initialize map */
	$scope.initialize = function(latitude, longitude) {
	
		$scope.mapOptions = {
		  center: new google.maps.LatLng(55.67610, 12.56834), //Får ikke et coordinat til at starte med så viser grå skærm
		  zoom: 12,
		  streetViewControl: false,
		  zoomControl: true,
		  zoomControlOptions: {
		  	style: google.maps.ZoomControlStyle.LARGE
		  },
		  maptypecontrol :false,
		  disableDefaultUI: true,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		/* 	Add map to #map_canvas */
		$scope.map = new google.maps.Map(document.getElementById($scope.map_id), $scope.mapOptions);    
		$scope.startWatchPosition()
	}

	$scope.addMarkerToMap = function( latitude, longitude, label ){
		// Create the marker - this will automatically place it
		// on the existing Google map (that we pass-in).
		var marker = new google.maps.Marker({
				map: $scope.map,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(latitude,longitude),
			title: (label || "")
		});
	 
		// Return the new marker reference.
		return(marker);
	}

	// I update the marker's position and label.
	$scope.updateMarker = function(marker, latitude, longitude, label ){
		// Update the position.
		marker.setPosition(new google.maps.LatLng(latitude, longitude));
/*  		console.log(position.coords.latitude, position.coords.longitude) */

		// Update the title if it was provided.
		if (label){
			marker.setTitle( label );
		}
		$scope.map.setCenter(new google.maps.LatLng(latitude, longitude));
	}
	
	$scope.startWatchPosition = function(){
		$scope.positionTimer = navigator.geolocation.watchPosition(function( position ){
			// Log that a newer, perhaps more accurate
			// position has been found.
				console.log( "Newer Position Found" );
			console.log(position.coords.latitude, position.coords.longitude)
			 
			// Set the new position of the existing marker.
			if(!$scope.locationMarker){
				$scope.locationMarker = $scope.addMarkerToMap(
					position.coords.latitude,
					position.coords.longitude,
					"Initial Position"
				);
			}
			$scope.updateMarker($scope.locationMarker, position.coords.latitude, position.coords.longitude, "Updated / Accurate Position");
			$scope.$emit($scope.map_set_position, [position.coords.latitude, position.coords.longitude]);
		}, $scope.error, {maximumAge:6000, timeout:5000});
	 
			// If the position hasn't updated within 5 minutes, stop
			// monitoring the position for changes.
		setTimeout(function(){
			// Clear the position watcher.
			navigator.geolocation.clearWatch( positionTimer );
			}, (1000 * 60 * 5)
		);	
	}
	
	$scope.error = function(err){
			console.log("position not found" + err);
			$scope.gpsNotFound();
		}
	
	$scope.$on("resettingGPS", function(){
		$scope.gps_found = null;
	})
	
	$scope.gpsStateUndefined = function(){
		return $scope.gps_found==null;
	}
	
	$scope.gpsFound = function(){
		return $scope.gps_found==true
	}
	
	$scope.gpsNotFound = function(){
		
		return $scope.gps_found==false;
	
	}
}