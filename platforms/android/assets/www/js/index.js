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
	alert(device.uuid)
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

function dropTables(){

	shortName = 'WebSqlDB';
	version = '1.0';
	displayName = 'WebSqlDB';
	maxSize = 65535;
	
	db = openDatabase(shortName, version, displayName, maxSize);


	db.transaction(function(tx){

		// IMPORTANT FOR DEBUGGING!!!!
		// you can uncomment these next twp lines if you want the table Trip and the table Auth to be empty each time the application runs
		tx.executeSql( 'DROP TABLE Trip');
		tx.executeSql( 'DROP TABLE Auth');

	})
}