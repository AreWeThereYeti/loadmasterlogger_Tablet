/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
window.deviceReady=false;

 
    // Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
 
     // device APIs are available
function onDeviceReady() {
	window.deviceReady=true;
	console.log("Device ready");
/* 	countHandler(); */
}

// onSuccess Geolocation
function onSuccess(position) {
    var element = document.getElementById('geoTemp');
    element.innerHTML = 'Success...';
    console.log("onSuccess loaded!!!");                            
                                    
    initialize(position.coords.latitude, position.coords.longitude);
                            
}
// onError Callback receives a PositionError object
function onError(error) {
    var element = document.getElementById('geoTemp');
    element.innerHTML = 'Error...';
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    
    console.log("Starting manuel marker positioning.");                            
    google.maps.event.addListener($scope.marker, 'dragend', function(event) {
		console.debug('new position is '+event.latLng.lat()+' / '+event.latLng.lng());
	});
}

/* ------ Initialize app ----------*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);


		/* Outcommented because of error
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		*/
		
        console.log('Received Event: ' + id);
    }
};

function isDatabaseEmpty(){

	// initial variables
	var shortName = 'WebSqlDB';
	var version = '1.0';
	var displayName = 'WebSqlDB';
	var maxSize = 65535;

	db = openDatabase(shortName, version, displayName,maxSize);
	 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT COUNT(*) FROM Trip',[], checkConnection);
		},function error(err){alert('error selecting from database ' + err)}, function success(){}
	);
	return false;
} 

/* Call this function on upload success with recived IDs */
function dropRowsSynced(){
	// initial variables
	var shortName = 'WebSqlDB';
	var version = '1.0';
	var displayName = 'WebSqlDB';
	var maxSize = 65535;

	db = openDatabase(shortName, version, displayName,maxSize);
	 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	 
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('DELETE FROM Trip WHERE id = ?', [/* Insert ID of synced rows */]);
		},function error(err){alert('error selecting from database ' + err)}, function success(){}
	);
	return false;
}

function checkConnection(transaction, results, $scope){
	console.log("vi er nu i CountHandler");
	if(navigator.connection.type == Connection.UNKNOWN || navigator.connection.type == Connection.WIFI){
		console.log('Vi fandt en unknown connection');
		alert('Vi fandt en unknown connection')
	} else if(navigator.connection.type == Connection.CELL_3G || navigator.connection.type == Connection.CELL_4G){
		console.log("Found connection and Starting sync ")
		syncToDatabase($scope);
	}
}


/* Alternative method */

function insertRecord($scope) {
	if (navigator.connection.type == Connection.CELL_3G || navigator.connection.type == Connection.CELL_4G){ // Check internet is online or Off-line.	 
		db.transaction(function (tx)	 
			{
				tx.executeSql('SELECT * FROM Trip', [], function (tx, result)  // Fetch records from SQLite		 
				{	 
					var dataset = result.rows; 
					for (var i = 0, item = null; i < dataset.length; i++) {
						item = dataset.item(i); 
						var useridinsert = item['_id']; 
						var usercargoinsert = item['_cargo']; 
						var userlicenseplateinsert = item['_license_plate']; 
						console.log(item['_id'] + item['_cargo' + item['_license_plate'])
						InsertRecordOnServerFunction(useridinsert, usercargoinsert, userlicenseplateinsert);      // Call Function for insert Record into SQl Server
					}
				});
			});
	 
		var usercargotemp = $scope.cargo;
		var userlicenseplatetemp = $scope.licenseplate; 
		var useridtemp = 0;
	 
		InsertRecordOnServerFunction(useridtemp, usercargotemp, userlicenseplatetemp); 
	}
	 
	else {
		var usercargotemp = $scope.cargo;
		var userlicenseplatetemp = $scope.licenseplate;
		db.transaction(function (tx) { tx.executeSql('INSERT INTO Trip(_license_plate, _cargo, _start_timestamp, _start_location, _start_comments) VALUES ("'+$scope.trip.license_plate+'", "'+$scope.trip.cargo+'", "'+$scope.trip.start_timestamp+'", "'+$scope.trip.start_location+'", "'+$scope.trip.start_comments+'")'); 
		}); // If Off-line, then insert into SQLite.
	
		function InsertRecordOnServerFunction(useridinsert, usercargoinsert, userlicenseplateinsert){  // Function for insert Record into SQl Server 	 
			var tripinsertinfo = { TripInformation: { id: useridinsert, cargo: usercargoinsert, licenseplate: userlicenseplateinsert} };
			
/* This needs to be inserted into data 
			var data = {
			     access_token:"6d21491d136311b69181b9ed722b5f40",
			     trips:[$scope.trip]
			  },
			
*/
			$.ajax({
			 
				type: "POST",
				url: "http://10.0.0.71:3000/api/v1/trips",
				data :  {
				     access_token:"6d21491d136311b69181b9ed722b5f40", // Skal kun sættes en gang ind i databasen
				     trips:[$scope.trip] // Det her skal være et Array af alle trips i databasen
				 },			
				contentType: "application/json; charset=utf-8", 
				dataType: "json",
				processdata: true,
				success: function (msg)
				{
					//On Successfull service call
					InsertServiceSucceeded(msg);
				},
				error: function (msg) {
					alert("Error In Service");
				}
		 
			});
		 
		}
	}
}

 
function InsertServiceSucceeded(result) // Sucess Handler Function 
{
/* 	resultObject = result.InsertUserInformationResult; */
	if (resultObject)
 		{ 
			alert("User Id for Deleted :   " + resultObject.ErrorDesc); 
			var insertedtripid = Number(resultObject.tripId); 
			db.transaction(function (tx) { tx.executeSql(deleteStatement, [inserteduserid], showRecords, onError); alert("Delete trip :  " + resultObject.userName + " Sucessfully"); });
		}
		else
		{
		alert("Entry Not Deleted");	 
	}
}


