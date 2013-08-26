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
 
window.deviceReady=false

console.log("index.js loaded ");
 
    // Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);
 
     // device APIs are available
function onDeviceReady() {
	window.deviceReady=true;
	console.log("Device ready");
	countHandler();
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
		transaction.executeSql('SELECT COUNT(*) FROM Trip',[], countHandler);
		},function error(err){alert('error selecting from database ' + err)}, function success(){}
	);
	return false;
 
/*
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM Trip',[], dataSelectHandler);
		},function error(err){alert('error selecting from database ' + err)}, function success(){}
	);
	return false;
*/
	
} 


function countHandler(transaction, results){

	console.log("vi er nu i CountHandler");
		if(checkConnection() == Connection.UNKNOWN || checkConnection() == Connection.WIFI){
			console.log('Vi fandt en unknown connection');
			alert('Vi fandt en unknown connection')
		} else if(checkConnection() == Connection.CELL_3G || checkConnection() == Connection.CELL_4G){
			console.log("Found connection and Starting sync ")
			syncToDatabase();
		}

}

function checkConnection() {
    return navigator.connection.type;
}

