"use strict"

// --- Global Variables --- //
var apiKey = "562af076e8f2edf99452364e33679082";
var atms = null // atm array

function main() {
  // use default values (geolocation too annoying)
  getAtms(38.8960952, -77.1333157)

}

function updateAtmLocation() {
  var mapppp = map
  var mapCenter = map.getCenter()
  var lat = map.getCenter().lat()
  var lng = map.getCenter().lng()
  getAtms(lat, lng)
}

function getAtms(lat, lng) {
  $.ajax({
    url: "http://api.reimaginebanking.com/atms?lat=" + lat + "&lng=" + lng + "&rad=10&key=" + apiKey,
    type: "GET",
    contentType: 'application/json',  // this is a required header
    success: function(resultsJson) {
      atms = resultsJson
      drawAllAtmMarkers()
    }
  });
}

function drawAllAtmMarkers() {
  console.log(atms)
  var atmData = atms.data
  var atm = null
  var i
  for(i = 0; i < atmData.length; i++) {
    atm = atmData[i]
    var title = atm.name
    var addr = atm.address
    var content = "<h5>" + title +"</h5>" +
                  "<b>Address: </b>" + addr.street_number + " " + addr.street_name + ", " +
                  " " + addr.city + " " + addr.state + " " + addr.zip + "<br/>" +
                  "<b>Hours: </b>" + atm.hours[0] + "<br/>" +
                  "<b>Accessibility: </b>"
     atm.accessibility ? content += "accessible as FUCK" : content += "get rekt m8"


    drawAtmMarker(atm.geocode.lat, atm.geocode.lng, title, content)
  }
}

function writeInHtml(documentId, content) {
  document.getElementById(documentId).innerHTML = content
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