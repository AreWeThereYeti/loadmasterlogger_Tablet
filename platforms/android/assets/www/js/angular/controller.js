/* Is this needed? */
angular.module("loadmaster",[])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

/* User controller with angularjs */
function userCtrl($scope) {	

	$scope.shortName = 'WebSqlDB';
	$scope.version = '1.0';
	$scope.displayName = 'WebSqlDB';
	$scope.maxSize = 65535;
	$scope.host = 'http://192.168.1.33:3000';

	$scope.init = function(){
		$scope.initializeDB()
		$scope.isAccessTokenInDatabase()
		$scope.intervalID = setInterval(function(){
			$scope.$apply(function(scope){
				document.addEventListener("deviceready", function(){
					$scope.device_uuid = device.uuid;
					console.log($scope.device_uuid)
				}, false);
			scope.checkConnection();
		  	})	
			console.log("firing checkConnection")
		}, 500000);
		
	}
	
	$scope.isAccessTokenInDatabase = function(){
			// initial variables
		if(!$scope.db){
			$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSize);
		}	
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
		
		console.log("is access token in database?")
		
		$scope.db.transaction(function (tx){
			tx.executeSql('SELECT * FROM Auth', [], function (tx, result){  // Fetch records from SQLite
				var dataset = result.rows; 
				if (dataset.length == 0 ){
					$scope.runSetupScreen();
				}
				else if(!!dataset.length){
				$scope.access_token = dataset.item(0).access_token;	
				console.log("access token " + $scope.access_token);
				}
			});
		});	
	}
	
	$scope.runSetupScreen = function(){
		console.log("opening modal")
		$("#modal" ).popup().popup("open");
	}
		
	/* check Connection */
	$scope.checkConnection = function(){
		console.log("Checking connection");
		if(navigator.connection.type == Connection.UNKNOWN || navigator.connection.type == Connection.WIFI){
			console.log('Unknown connection');
			$scope.isDatabaseEmpty();

		} else if(navigator.connection.type == Connection.CELL_3G || navigator.connection.type == Connection.CELL_4G){
			console.log("Found connection. Checking if database is empty ")
		}
	}
	
	/* Is database empty */
	$scope.isDatabaseEmpty = function() {
		if(!$scope.db){
			$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSize);
		}	
		
		var numberOfRows;
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
	
		query = "SELECT * FROM Trip;";
		$scope.db.transaction(function(transaction){
	         transaction.executeSql(query, [], function(tx, results){
	
	             if (results.rows.length == 0) { 
	                  numberOfRows = results.rows.length;
	                   console.log("table has "+results.rows.length+" rows. returning "+ numberOfRows);
	                 }   else    {
	                  numberOfRows = results.rows.length;    
	                  console.log("table is not empty. returning number of rows : " + numberOfRows + ". Startin sync");
	                  
					 $scope.syncToDatabase()
							
	                   
	                 }                               
	         },function error(err){alert('error selecting from database ' + err)}, function success(){});              
		});
		return numberOfRows;
	}
	
	/* Sync to server */
	$scope.syncToDatabase = function () {
			
		if(!$scope.db){
			$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSize);
		}	
			
			$scope.db.transaction(function (tx)	 
				{
					tx.executeSql('SELECT * FROM Trip', [], function (tx, result)  // Fetch records from SQLite		 
					{	 
						var dataset = result.rows; 
						var trips = new Array();
						for (var i = 0, item = null; i < dataset.length; i++) {
							item = dataset.item(i);
							var trip = {
								trip_id			: item['Id'],
								cargo			: item['_cargo'],
								license_plate 	: item['_license_plate'],
								start_location 	: item['_start_location'],
								start_address 	: item['_start_address'],
								end_location 	: item['_end_location'],
								end_address	 	: item['_end_address'],
								start_timestamp : item['_start_timestamp'],
								end_timestamp 	: item['_end_timestamp'],
								start_comments 	: item['_start_comments'],
								end_comments 	: item['_end_comments']
							};
							
							if(!!item['_end_timestamp']){
								console.log("end_timestamp er ikke null men " + item['_end_timestamp'])
								console.log(trip)
								trips.push(trip);	
							}
						}
						$scope.InsertRecordOnServerFunction(trips);      // Call Function for insert Record into SQl Server
	
					});
				});
			}
	
	/* Syncs with server */
	$scope.InsertRecordOnServerFunction = function(trips){  // Function for insert Record into SQl Server
			$.ajax({
			type: "POST",
			url: $scope.host + "/api/v1/trips",
			data :  {
			     access_token	:"13c7d1c2c213ba695ea8f06e5b909b44", // Skal kun sættes en gang ind i databasen
			     trips			: trips,
			     device_id		: $scope.device_id
			 },			
			processdata: true,
			success: function (msg)
			{
				console.log(msg)
				//On Successfull service call
	/* 			dropRowsSynced(msg); Uncomment this when success message is received. Make this function receive synced rows from server*/ 
			},
			error: function (msg) {
				alert("Error In Service");
			}
	 
		});
	
	};
	
	/* Drops synced rows */
	function dropRowsSynced(){
		 
		 if(!$scope.db){
			$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSize);
		}	
			
		 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
		 
	/* 	Deletes synced rows from trips table */
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('DELETE FROM Trip WHERE id = ?', [/* Insert array of IDs of synced rows. See below */]);
			},function error(err){alert('error deleting from database ' + err)}, function success(){}
		);
		return false;
	}
	
	/*
	From apple dev docs
	db.transaction(
	    function (transaction) {
	        transaction.executeSql("UPDATE people set shirt=? where name=?;",
	            [ shirt, name ]); // array of values for the ? placeholders
	    }
	);
	*/
	
	
	
/* 	Alt herfra virker */
	
		

	$scope.submitStartNewTrip = function($event){

		$event.preventDefault();
		$.mobile.changePage("#home");

	}
	
	$scope.submitToken = function($event){

		console.log($scope.access_token)
		
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('INSERT INTO AUTH (access_token) VALUES ("'+$scope.access_token+'")',[]);
			},function error(err){alert('error on save to local db ' + err)}, function success(){}
		);
		
		$event.preventDefault();
		$.mobile.changePage("#home");
		
		return false;
	}
	 
	/* --------------  Database ---------------- */	 	
	// called when the application loads
	$scope.initializeDB = function(){
	
			// initial variables
	 
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
		if(!$scope.db){
			$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSize);
		}	
		// this line will try to create the table User in the database justcreated/openned
		$scope.db.transaction(function(tx){

			tx.executeSql( 'CREATE TABLE IF NOT EXISTS Auth(access_token varchar)', []);
/* 			tx.executeSql( 'INSERT INTO Auth(access_token ) VALUES ("'++'")', []); */

			 
			// this line actually creates the table User if it does not exist and sets up the three columns and their types
			// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
			// easily from the table.
			tx.executeSql( 'CREATE TABLE IF NOT EXISTS Trip(Id INTEGER PRIMARY KEY AUTOINCREMENT, _license_plate varchar, _cargo varchar, _start_timestamp int, _start_location int, _start_address varchar,  _start_comments varchar, _end_timestamp int, _end_location int, _end_address varchar, _end_comments varchar)', [])},
			function error(err){alert('error on init local db ' + err)}, function success(){console.log("database created")}
		) 
	}
	
	// this is the function that puts values into the database from page #home
	$scope.AddStartValuesToDB = function(trip) {
		
		console.log("cargo er " + trip.cargo);
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}
	 
		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			console.log("Cargo er i submit og vi kører nu addstartvalues to db" + $scope.cargo)

		
			transaction.executeSql('INSERT INTO Trip(_license_plate, _cargo, _start_timestamp, _start_location, _start_address, _start_comments) VALUES ("'+trip.license_plate+'", "'+trip.cargo+'", "'+trip.start_timestamp+'", "'+trip.start_location+'", "'+trip.start_address+'", "'+trip.start_comments+'")');	
		},function error(err){alert('error on save to local db ' + err)}, function success(){});
		return false;
	}
	
/* 	"'+$scope.trip.license_plate+'", "'+$scope.trip.cargo+'", "'+$scope.trip.start_timestamp+'", "'+$scope.trip.start_location+'", "'+$scope.trip.start_address+'", "'+$scope.trip.start_comments+'" */
	
	// this is the function that puts values into the database from page #home
	$scope.AddEndValuesToDB = function(trip) {
	 
		if (!window.openDatabase) {
			alert('Databases are not supported in this browser.');
			return;
		}

		// this is the section that actually inserts the values into the User table
		$scope.db.transaction(function(transaction) {
			transaction.executeSql('UPDATE Trip SET _end_timestamp ="'+trip.end_timestamp+'", _end_location ="'+trip.end_location+'", _end_address ="'+trip.end_address+'", _end_comments ="'+trip.end_comments+'" WHERE Id= last_insert_rowid()',[]);
			},function error(err){alert('error on save to local db ' + err)}, function success(){}
		);
		return false;
	}
} 

