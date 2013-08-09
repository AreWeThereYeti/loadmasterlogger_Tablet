function tripCtrl($scope) {
  $scope.licenseplate = "pik";
  $scope.cargo = "mere pik";
  $scope.submit = function($event) {
  	$event.preventDefault();
	console.log($scope.licenseplate);
	$.mobile.changePage("#two");
	/*
    if (this.text) {
      this.list.push(this.text);
      this.text = '';
    }
    */
  };
}