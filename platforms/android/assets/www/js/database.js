/* --------------  Database ---------------- */

// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
 
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}
 
// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: Database Initialized");
}
 
function nullHandler(){};
 
// called when the application loads
function initializeDB(){
 
	// This alert is used to make sure the application is loaded correctly
	// you can comment this out once you have the application working
	console.log("DEBUGGING: we are in the InitializeDB function");
	
	if (!window.openDatabase) {
		// not all mobile devices support databases  if it does not, the following alert will display
		// indicating the device will not be albe to run this application
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this line tries to open the database base locally on the device
	// if it does not exist, it will create it and return a database object stored in variable db
	db = openDatabase(shortName, version, displayName,maxSize);
 
	// this line will try to create the table User in the database justcreated/openned
	db.transaction(function(tx){
 
	// IMPORTANT FOR DEBUGGING!!!!
	// you can uncomment this next line if you want the User table to be empty each time the application runs
	tx.executeSql( 'DROP TABLE Trip',nullHandler,nullHandler);

	 
	// this line actually creates the table User if it does not exist and sets up the three columns and their types
	// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
	// easily from the table.
	tx.executeSql( 'CREATE TABLE IF NOT EXISTS Trip(Id int, _licenseplate varchar, _cargo varchar, _timeStampStart int, _startPosition int,  _startComments varchar, _timeStampEnd int, _endPosition int, _endComments varchar)', [] ,nullHandler,errorHandler);
	},errorHandler,successCallBack); 
}
 
// this is the function that puts values into the database from page #home
function AddValuesToDB() {
 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO Trip(Id, _licenseplate, _cargo, _timeStampStart, _startPosition, _startComments, _timeStampEnd, _endPosition, _endComments) VALUES (1,"MMMMM", "c", 8000, 3421, "dwf", 324, 3244, 4324)',[], nullHandler,errorHandler);
		/* 	$scope.trip.id,$scope.trip.licenseplate, $scope.trip.cargo, $scope.trip.timeStampStart, $scope.trip.startPosition, scope.trip.startComments */

	});
	return false;
}

