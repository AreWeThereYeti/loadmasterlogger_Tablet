console.log("directives loaded");

angular.module('loadmaster', [])
	.directive('ngMap', function() {
	    return {
	    replace: true,
	    templateUrl: '../www/js/angular/templates/map.html',
	    link:function(scope,elements,attrs){
	    }
	};
});