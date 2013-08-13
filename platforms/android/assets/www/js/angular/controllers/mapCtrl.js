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
  
function mapCtrl($scope) {
	console.log("mapCtrl Loaded");
}