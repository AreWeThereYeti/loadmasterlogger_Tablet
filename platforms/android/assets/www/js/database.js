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
   alert("DEBUGGING: success");
}
 
function nullHandler(){};
 
// called when the application loads
function onBodyLoad(){
 
	// This alert is used to make sure the application is loaded correctly
	// you can comment this out once you have the application working
	alert("DEBUGGING: we are in the onBodyLoad() function");
	
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
 
	  // you can uncomment this next line if you want the User table to be empty each time the application runs
	  // tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
	 
	  // this line actually creates the table User if it does not exist and sets up the three columns and their types
	  // note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
	  // easily from the table.
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Trip(Id INTEGER NOT NULL PRIMARY KEY, licenseplate TEXT NOT NULL, cargo TEXT NOT NULL, timeStampStart INTEGER NOT NULL, timeStampEnd INTEGER NOT NULL, startPosition INTEGER NOT NULL, endPosition INTEGER NOT NULL, startComments TEXT NOT NULL, endComments TEXT NOT NULL)',
		[],nullHandler,errorHandler);
	},errorHandler,successCallBack); 
}
 
// this is the function that puts startvalues into the database from page #home
function AddStartValueToDB() {
 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO Trip(Id, licenseplate, cargo, timeStampStart, startPosition, startComments) VALUES (?,?,?,?,?,?)',[$scope.trip.id, $scope.trip.licenseplate, $scope.trip.cargo, $scope.trip.timeStampStart, $scope.trip.startPosition, scope.trip.startComments], nullHandler,errorHandler);
	});
	
	return false;
}

// this is the function that puts startvalues into the database from page #home
function AddEndValueToDB() {
 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO Trip(timeStampEnd, endPosition, endComments) VALUES (?,?,?)',[$scope.trip.timeStampEnd, $scope.trip.endPosition, $scope.trip.endComments], nullHandler,errorHandler);
	});
	
	return false;
}
