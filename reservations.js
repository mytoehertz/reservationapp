 // Dependencies
  // ===========================================================
  var express = require('express');
  
  var app = express();
  var PORT = 3000;
  
  // Data
  // ===========================================================
  var reservation = [
   
  ];
  
  // Routes
  // ===========================================================
  app.get('/', function(req, res) {
    res.send('Welcome to the reservations page!');
  });
  
  // Displays all reservations
  app.get('/api/reservation', function(req, res) {
    return res.json(reservation);
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
  
  // Create New Reservation - takes in JSON input
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