/* --------------  Database ---------------- */



// this is the function that puts values into the database from page #home
function AddStartValuesToDB() {
 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO Trip(Id, _licenseplate, _cargo, _timeStampStart, _startPosition, _startComments) VALUES (1,"MMMMM", "c", 8000, 3421, "dwf")',[], nullHandler,errorHandler);

	});
	return false;
}

// this is the function that puts values into the database from page #home
function AddEndValuesToDB() {
 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('UPDATE Trip SET _timeStampEnd ="80", _endPosition ="80", _endComments ="80"',[], nullHandler,errorHandler);
		/* 	$scope.trip.id,$scope.trip.licenseplate, $scope.trip.cargo, $scope.trip.timeStampStart, $scope.trip.startPosition, scope.trip.startComments */

	});
	return false;
}


