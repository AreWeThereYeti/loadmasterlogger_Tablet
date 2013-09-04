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
 
var canConnect = false;
 
    // Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
 
     // device APIs are available
function onDeviceReady() {
	window.deviceReady=true;
	console.log("Device ready");
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

/* Call this function on upload success with recived IDs */

/*
var intervalID = setInterval(function(){
	checkConnection();
	console.log("firing checkConnection")
}, 5000);
*/

function checkConnection(transaction, results, $scope){
	console.log("Checking connection");
	if(navigator.connection.type == Connection.UNKNOWN || navigator.connection.type == Connection.WIFI){
		console.log('Unknown connection');
	} else if(navigator.connection.type == Connection.CELL_3G || navigator.connection.type == Connection.CELL_4G){
		console.log("Found connection. Checking if database is empty ")
		isDatabaseEmpty();
	}
}

function isDatabaseEmpty() {

	// initial variables
	var shortName = 'WebSqlDB';
	var version = '1.0';
	var displayName = 'WebSqlDB';
	var maxSize = 65535;	
	db = openDatabase(shortName, version, displayName,maxSize);
	var numberOfRows;

	 
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}

	query = "SELECT * FROM Trip;";
	db.transaction(function(transaction){
         transaction.executeSql(query, [], function(tx, results){

             if (results.rows.length == 0) { 
                  numberOfRows = results.rows.length;
                   console.log("table has "+results.rows.length+" rows. returning "+ numberOfRows);
                 }   else    {
                  numberOfRows = results.rows.length;    
                  console.log("table is not empty. returning number of rows : " + numberOfRows + ". Startin sync"); 
                  syncToDatabase()
                 }                               
         },function error(err){alert('error selecting from database ' + err)}, function success(){});              
	});
	return numberOfRows;
}

/* Alternative method */

function syncToDatabase() {
		
		var shortName = 'WebSqlDB';
		var version = '1.0';
		var displayName = 'WebSqlDB';
		var maxSize = 65535;
	
		db = openDatabase(shortName, version, displayName,maxSize);
		
		db.transaction(function (tx)	 
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
					InsertRecordOnServerFunction(trips);      // Call Function for insert Record into SQl Server

				});
			});
		}

/* Syncs with server */
function InsertRecordOnServerFunction(trips){  // Function for insert Record into SQl Server 	 
		$.ajax({
		type: "POST",
		url: "http://localhost:3000/api/v1/trips",
		data :  {
		     access_token	:"f8fd3066e1c4cd9315595b14c5a58a14", // Skal kun sættes en gang ind i databasen
		     trips			: trips,
		     device_id		: 'new'
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
	 
/* 	Deletes synced rows from trips table */
	db.transaction(function(transaction) {
		transaction.executeSql('DELETE FROM Trip WHERE id = ?', [/* Insert ID of synced rows */]);
		},function error(err){alert('error deleting from database ' + err)}, function success(){}
	);
	return false;
}