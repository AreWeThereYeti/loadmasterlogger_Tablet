/*
$("#home").live('pageinit', function() { 
	Indsæt kode her for at køre kode når #home er loaded. Virker ikke!
 });
*/


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
    var map_start = new google.maps.Map(document.getElementById("map_canvas_start"), mapOptions);

    
/* 	      Place marker on map_start */
	var marker = new google.maps.Marker({
	   position: markerPosition,
	   draggable:true,
	   animation: google.maps.Animation.DROP,
	   map: map_start,
	   title: "Start Position"
	});
	

	
	// adds a listener to the marker
	// gets the coords when drag event ends
	// then updates the input with the new coords
	google.maps.event.addListener(marker, 'dragend', function(event) {
		console.debug('new position is '+event.latLng.lat()+' / '+event.latLng.lng());
		
	});
  }
  
/*

$("#two").live('pageinit', function() {

function initialize_end(latitude, longitude) {

	var markerPosition = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 12,
      streetViewControl: false,
      maptypecontrol :false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

	var map_end = new google.maps.Map(document.getElementById("map_canvas_end"), mapOptions);
	var marker = new google.maps.Marker({
	   position: markerPosition,
	   draggable:true,
	   animation: google.maps.Animation.DROP,
	   map: map_end,
	   title: "end Position"
	});
  }
  
}
*/

function mapCtrl($scope) {
	console.log("mapCtrl Loaded");
}