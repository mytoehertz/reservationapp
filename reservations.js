 // Dependencies
  // ===========================================================
  var express = require('express');
  
  var app = express();
  var PORT = 3000;
  
  // Data
  // ===========================================================
  var reservation = [
    {
        Primary_ID: 'mytoehertz',
        name: 'Juan Hernandez',
        email: 'juanitosemail@gmail.com',
        age: 34
      }
   
  ];
  
  // Routes
  // ===========================================================
  app.get('/', function(req, res) {
    res.send('Welcome to the reservations page!');
  });
  
  // Displays all reservations
  app.get('/api/reservation', function(req, res) {
    return res.json(reservation);
    // res.send("I am working");
  });
  
  // Displays a single reservation, or shows "No reservation found"
  app.get('/api/reservation/:reservation', function(req, res) {
    // Grab the selected parameter
    var chosen = req.params.reservation;
    console.log(chosen);
  
    // Filter to show only the selected reservation
    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
  
    // Otherwise display "No reservation found"
    return res.send('No reservation found');
  });
  
//   Create New Reservation - takes in JSON input
  app.post("/api/reservation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    console.log(req.body);
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    reservation.push(newReservation);
    res.json(newReservation);
  });
  
  // Listener
  // ===========================================================
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });


  // In this code below we create the Front-end Javascript which "POSTS" our form data to our express server.
	// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
	// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
	// In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

	$(".submit").on("click", function(){

		// Here we grab the form elements
		var newReservation = {
			customerName: $('#reserve_name').val().trim(),
			phoneNumber: $('#reserve_phone').val().trim(),
			customerEmail: $('#reserve_email').val().trim(),
			customerID: $('#reserve_uniqueID').val().trim()
		};

		console.log(newReservation);

		// This line is the magic. It's very similar to the standard ajax function we used.
		// Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
		// The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
		// depending on if a tables is available or not.

		// Here we get the location of the root page.
		// We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
		var currentURL = window.location.origin;

	    $.post(currentURL + "/api/view", newReservation,
	    function(data){

	    	// If a table is available... tell user they are booked.
	    	if(data == true){
	    		alert("Yay! You are officially booked!")
	    	}

	    	// If a table is available... tell user they on the waiting list.
	    	if(data == false){
	    		alert("Sorry you are on the wait list")
	    	}

	    	// Clear the form when submitting
    		$('#reserve_name').val("");
			$('#reserve_phone').val("");
			$('#reserve_email').val("");
			$('#reserve_uniqueID').val("");

	    });

return false;

});
