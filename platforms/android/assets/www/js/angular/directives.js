console.log("directives loaded");

angular.module('loadmaster', [])
	.directive('ngMapStart', function() {
	    return {
	    replace: true,
	    templateUrl: '../www/js/angular/templates/map_start.html',
	    link:function(scope,element,attrs){
	    	scope.map_id="map_canvas_start"
	    	$('geoTemp').html('Ready...')
	    	if(window.deviceReady){
				scope.drawCurrentPosition()
	    	}else{
		    	document.addEventListener("deviceready", function(){
					scope.drawCurrentPosition()
				}, false);
	    	}
			$('#home').bind( "pagebeforeshow", function( event ) { 
				console.log(' pagebeforeshow ran on #home')
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
	    	if(window.deviceReady){
				scope.drawCurrentPosition()
	    	}else{
		    	document.addEventListener("deviceready", function(){
					scope.drawCurrentPosition()
				}, false);
	    	}
	    	$('#two').bind( "pagebeforeshow", function( event ) {
	    		console.log(' pagebeforeshow ran on #two')
				scope.drawCurrentPosition()
			} )
	    }
	};
});