"use strict"

// --- Global Variables --- //
var apiKey = "562af076e8f2edf99452364e33679082";
getAtms()
function getAtms() {
  $.ajax({
    url: "http://api.reimaginebanking.com/atms?lat=38.9283&lng=-77.1753&rad=1&key=" + apiKey,
    type: "GET",
    contentType: 'application/json',  // this is a required header
    success: function(resultsJson) {
      console.log(resultsJson);
      console.log(resultsJson.message);
      document.write(resultsJson.data[0].address.street_name + "<br/>");
      document.write(resultsJson.data[1].address.street_name + "<br/>");
    }
  });
}



/*
    // declaration
    // Make sure you Stringify the JSON. It doesn't matter where, just do it before passing into Ajax.
    var values = JSON.stringify(
      {
        "first_name": "a",
        "last_name": "a",
        "address": {
          "street_number": "a",
          "street_name": "a",
          "city": "a",
          "state": "aa",
          "zip": "12345"
        }
      }
    );

    var apiKey = "562af076e8f2edf99452364e33679082";
    // request
    $.ajax({
      url: "http://api.reimaginebanking.com/customers?key=" + apiKey,
      type: "POST",
      contentType: 'application/json',  // this is a required header
      data: values,
      success: function(resultsJson) {
        console.log(resultsJson);
        console.log(resultsJson.message);
        document.write(resultsJson.message + "<br/>");
        document.write(resultsJson.code + "<br/>");
        document.write(resultsJson.objectCreated._id + "<br/>");
      }
    });
*/