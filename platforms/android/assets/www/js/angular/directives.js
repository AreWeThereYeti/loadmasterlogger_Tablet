console.log("directives loaded");

angular.module('loadmaster', [])
	.directive('ngMapStart', function() {
	    return {
	    replace: true,
	    templateUrl: '../www/js/angular/templates/map_start.html',
	    link:function(scope,elements,attrs){
	    }
	}
})
	.directive('ngMapEnd', function() {
	    return {
	    replace: true,
	    templateUrl: '../www/js/angular/templates/map_end.html',
	    link:function(scope,elements,attrs){
	    }
	};
});