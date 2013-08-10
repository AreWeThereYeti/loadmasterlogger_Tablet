function tripCtrl($scope) {
  $scope.submit = function($event) {
  	$event.preventDefault();
	console.log($scope.licenseplate, $scope.cargo, $scope.start_comments, $scope.end_comments);
	$.mobile.changePage("#two");
  };
  
  $scope.save = function () {
        $.ajax({
            type: "POST",
            url: "EmpService.asmx/InsertEmployee",
            data: "{'licenseplate':'" + $scope.licenseplate + "','Cargo':'" + 
            $scope.cargo + "','lastName':'" + $scope.EmpLastName + "',
            'Start kommentarer':'" + $scope.start_comments + "','city':'" + $scope.end_comments,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                alert(msg.d);
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };
  
}