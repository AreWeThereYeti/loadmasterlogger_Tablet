
angular.module("loadmaster",[])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

/* User controller with angularjs */
function userCtrl($scope) {
    console.log("UserCtrl Loaded");
	
	$scope.trip =
    {
    	id 				: null,
		licenseplate 	: null,
		cargo			: null,
		timeStampStart 	: null,
		timeStampEnd 	: null,
		startPosition	: null,
		endPosition		: null,
		startComments	: null,
		endComments		: null	
	};
	
	
	
	
	/* 	Set positions */
	$scope.$on('setStartPosition',function(ev,start_position){
		$scope.trip.startPosition=start_position;
	})
	
	$scope.$on('setEndPosition',function(ev,end_position){
		$scope.trip.endPosition=end_position;
	})
	
	$scope.submitStartNewTrip = function() {
		$scope.$broadcast('resetTripValues');
	}
	
	/* 	Set timeStamps */
	$scope.$on('setTimeStampStart',function(ev,start_time_stamp,cargo,licenseplate,startComments){
		$scope.trip.timeStampStart=start_time_stamp;
		$scope.trip.licenseplate = licenseplate;
		$scope.trip.startComments = startComments;
		$scope.AddStartValuesToDB();

	})
	
	$scope.$on('setTimeStampEnd',function(ev,end_time_stamp){
		$scope.trip.timeStampEnd=end_time_stamp;
		$scope.AddEndValuesToDB();

	})
					
	$scope.submit_trip = function(){
		console.log('submit ran on userCxtrl');
		console.log($scope.trip);
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
			// you can uncomment this next line if you want the User table to be empty each time the application runs
			// tx.executeSql( 'DROP TABLE Trip');
		
			 
			// this line actually creates the table User if it does not exist and sets up the three columns and their types
			// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
			// easily from the table.
			tx.executeSql( 'CREATE TABLE IF NOT EXISTS Trip(Id INTEGER PRIMARY KEY AUTOINCREMENT, _licenseplate varchar, _cargo varchar, _timeStampStart int, _startPosition int,  _startComments varchar, _timeStampEnd int, _endPosition int, _endComments varchar)', [])},
			function error(err){alert('error on init local db ' + err)}, 
			function success(){}
		) 
	}
	
	// this is the function that puts values into the database from page #home
	$scope.AddStartValuesToDB = function() {
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
	 
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
		
			transaction.executeSql('INSERT INTO Trip(_licenseplate, _cargo, _timeStampStart, _startPosition, _startComments) VALUES ("'+$scope.trip.licenseplate+'", "'+$scope.trip.cargo+'", "'+$scope.trip.timeStampStart+'", "'+$scope.trip.startPosition+'", "'+$scope.trip.startComments+'")');	
		},function error(err){alert('error on save to local db ' + err)}, function success(){});
		return false;
	}
	
	// this is the function that puts values into the database from page #home
	$scope.AddEndValuesToDB = function() {
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
	 
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('UPDATE Trip SET _timeStampEnd ="'+$scope.trip.timeStampEnd+'", _endPosition ="'+$scope.trip.endPosition+'", _endComments ="'+$scope.trip.endComments+'" WHERE Id= last_insert_rowid()',[]);
			},function error(err){alert('error on save to local db ' + err)}, function success(){}
			/* 	$scope.trip.id,$scope.trip.licenseplate, $scope.trip.cargo, $scope.trip.timeStampStart, $scope.trip.startPosition, scope.trip.startComments */
		);
		return false;
	} 
}