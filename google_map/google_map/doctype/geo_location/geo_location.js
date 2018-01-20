// Copyright (c) 2017, sahil and contributors
// For license information, please see license.txt

frappe.ui.form.on('Geo Location', {
	refresh: function(frm) {
    
	}
});

// Created By sahil 17-08-2017
// Please do use this script at your own risk.

frappe.ui.form.on("Geo Location", "load_map", function(frm){ // Replace Employee to your formtype, load_this to your button name
	// set your origin address, accepts LatLng | String | google.maps.Place
	// destination address getting from the form, replace permanent_address to your field name
	// Refer API for more info https://developers.google.com/maps/documentation/javascript/directions
	var originAddress = frm.doc.source_address;
	var destAddress = frm.doc.destination_address;
	console.log(originAddress,destAddress);
	initMap(originAddress, destAddress);
});


function initMap(originAddress, destAddress) {
	// Initiate map with the origin address

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;//({draggable: true});
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 20,
		center: originAddress,
	});
	directionsDisplay.setMap(map);
	calculateAndDisplayRoute(directionsService, directionsDisplay, originAddress, destAddress);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, originAddress, destAddress) {
	// For more customization on the route and distanceMatrix, please refer to the API
	// API Link: https://developers.google.com/maps/documentation/javascript/distancematrix

	var service = new google.maps.DistanceMatrixService();
	directionsService.route({
		origin: originAddress,
		destination: destAddress,
		travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			frappe.msgprint('Directions request failed due to ' + status); // Customize your own error here
		}
	});


	service.getDistanceMatrix({
		origins: [originAddress],
		destinations: [destAddress],
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: false,
		avoidTolls: false
	}, function (response, status) {
		if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
			var distance = response.rows[0].elements[0].distance.text;

			// Display the distance in an form input, replace distance2 as your field name
			cur_frm.set_value("distance_map", distance);

			// The following line display to external div id instead of form input
			// Create an HTML field with the following option:
			// <p>Total Distance between two location:<span id="total"></span></p>

			// Uncomment the next 3 line to show the result in external div id
			var dvDistance = document.getElementById("total");
			dvDistance.innerHTML = "";
			dvDistance.innerHTML += " "+distance;

		} else {
			frappe.msgprint("Unable To Find Distance Via Road.");
		}
	});

}

