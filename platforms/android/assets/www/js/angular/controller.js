/* Is this needed? */
angular.module("loadmaster",[])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

/* User controller with angularjs */
function userCtrl($scope) {		
		$scope.submitStartNewTrip = function($event){
		$event.preventDefault();
		$.mobile.changePage("#home");
		$scope.license_plate 	= null;
		$scope.cargo			= null;
		$scope.start_timestamp 	= null;
		$scope.end_timestamp 	= null;
		$scope.start_location	= null;
		$scope.end_location		= null;
		$scope.start_comments	= null;
		$scope.end_comments		= null;
		$scope.start_address	= null;
		$scope.end_address 		= null;
		if($("select").is(':visible')){
			$("select").prop("selectedIndex",0);
			$('select').selectmenu('refresh', true);
		}
	}
	 
	/* --------------  Database ---------------- */	 	
	// called when the application loads
	$scope.initializeDB = function(){
	
			// initial variables
		var shortName = 'WebSqlDB';
		var version = '1.0';
		var displayName = 'WebSqlDB';
		var maxSize = 65535;
	 
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
		$scope.db = openDatabase(shortName, version, displayName,maxSize);
	 
		// this line will try to create the table User in the database justcreated/openned
		$scope.db.transaction(function(tx){
	 
			// IMPORTANT FOR DEBUGGING!!!!
			// you can uncomment this next line if you want the table Trip to be empty each time the application runs
			// tx.executeSql( 'DROP TABLE Trip');
		
			 
			// this line actually creates the table User if it does not exist and sets up the three columns and their types
			// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
			// easily from the table.
			tx.executeSql( 'CREATE TABLE IF NOT EXISTS Trip(Id INTEGER PRIMARY KEY AUTOINCREMENT, _license_plate varchar, _cargo varchar, _start_timestamp int, _start_location int, _start_address varchar,  _start_comments varchar, _end_timestamp int, _end_location int, _end_address varchar, _end_comments varchar)', [])},
			function error(err){alert('error on init local db ' + err)}, 
			function success(){}
		) 
	}
	
	// this is the function that puts values into the database from page #home
	$scope.AddStartValuesToDB = function() {
		
		console.log("cargo er " + $scope.cargo);
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
	 
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
		
			transaction.executeSql('INSERT INTO Trip(_license_plate, _cargo, _start_timestamp, _start_location, _start_address, _start_comments) VALUES ("'+$scope.license_plate+'", "'+$scope.cargo+'", "'+$scope.start_timestamp+'", "'+$scope.start_location+'", "'+$scope.start_address+'", "'+$scope.start_comments+'")');	
		},function error(err){alert('error on save to local db ' + err)}, function success(){});
		return false;
	}
	
/* 	"'+$scope.trip.license_plate+'", "'+$scope.trip.cargo+'", "'+$scope.trip.start_timestamp+'", "'+$scope.trip.start_location+'", "'+$scope.trip.start_address+'", "'+$scope.trip.start_comments+'" */
	
	// this is the function that puts values into the database from page #home
	$scope.AddEndValuesToDB = function() {
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
		
		console.log(+ $scope.end_timestamp + $scope.end_location + $scope.end_address + $scope.end_comments)
	 
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('UPDATE Trip SET _end_timestamp ="'+$scope.end_timestamp+'", _end_location ="'+$scope.end_location+'", _end_address ="'+$scope.end_address+'", _end_comments ="'+$scope.end_comments+'" WHERE Id= last_insert_rowid()',[]);
			},function error(err){alert('error on save to local db ' + err)}, function success(){}
		);
		return false;
	} 
}