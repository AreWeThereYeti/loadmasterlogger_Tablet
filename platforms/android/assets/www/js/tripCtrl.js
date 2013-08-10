/* Android fejl? http://samritchie.net/2011/04/01/uncaught-illegal-access-exception-in-android-browser-on-json-parse/
JSON.originalParse = JSON.parse;

JSON.parse = function(text){
	if (text) {
		return JSON.originalParse(text);
	} else {
		// no longer crashing on null value but just returning null
		return null;
	}
}
*/

    // Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
function onDeviceReady() {
    var element = document.getElementById('geoTemp');
    element.innerHTML = 'Ready...';
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });
}

// onSuccess Geolocation
function onSuccess(position) {
    var element = document.getElementById('geoTemp');
    element.innerHTML = 'Success...';                                    
    initialize(position.coords.latitude, position.coords.longitude);                            
}
// onError Callback receives a PositionError object
function onError(error) {
    var element = document.getElementById('geoTemp');
    element.innerHTML = 'Error...';
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
}
/* 			Initialize map */
  function initialize(latitude, longitude) {
   	var markerPosition = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 12,
      streetViewControl: false,
      maptypecontrol :false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
/* 	Add map to #map_canvas */
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
/* 	      Place marker on map */
	var marker = new google.maps.Marker({
	   position: markerPosition,
	   draggable:true,
	   animation: google.maps.Animation.DROP,
	   map: map,
	   title: "Start Position"
	});
	
	// adds a listener to the marker
	// gets the coords when drag event ends
	// then updates the input with the new coords
	google.maps.event.addListener(marker, 'dragend', function(event) {
		console.debug('new position is '+event.latLng.lat()+' / '+event.latLng.lng()); 
	});
  }

/* trip controller with angularjs */
function tripCtrl($scope) {
  $scope.submit = function($event) {
  	$event.preventDefault();
/* 	$scope.start_position = var markerPosition = new google.maps.LatLng(latitude, longitude); */
	console.log($scope.licenseplate, $scope.cargo, $scope.start_comments);
	$.mobile.changePage("#two");
  };
}