console.log("directives loaded");

angular.module('loadmaster', [])
	.directive('ngUser', function() {
	    return {
	    link:function(scope,element,attrs){
			scope.initializeDB()
			}
		}
	})
	.directive('ngMapStart', function() {
	    return {
	    replace: true,
	    templateUrl: '../www/js/angular/templates/map_start.html',
	    link:function(scope,element,attrs){
	    	scope.map_id="map_canvas_start"
			scope.map_set_position="setStartPosition"

	    	$('geoTemp').html('Ready...')
	    	if(window.deviceReady){
				scope.drawCurrentPosition()
	    	}else{
		    	document.addEventListener("deviceready", function(){
					scope.drawCurrentPosition()
				}, false);
	    	}
			$('#home').bind( "pageshow", function( event ) { 
				console.log(' pagewhow ran on #home')
				scope.drawCurrentPosition()
			} )
			}
		}
	})
	.directive('ngMapEnd', function() {
	    return {
	    replace: true,
	    templateUrl: '../www/js/angular/templates/map_end.html',
	    link:function(scope,element,attrs){
	    	var geo_el = document.getElementById('geoTemp');
			$('geoTemp').html('Ready...')
	    	scope.map_id="map_canvas_end"
	    	scope.map_set_position="setEndPosition"

	    	/*
if(window.deviceReady){
				scope.drawCurrentPosition()
	    	}else{
		    	document.addEventListener("deviceready", function(){
					scope.drawCurrentPosition()
				}, false);
	    	}
*/
	    	$('#two').bind( "pageshow", function( event ) {
	    		console.log(' pageshow ran on #two')
				scope.drawCurrentPosition()
			} )
	    }
	};
});