"use strict"

// --- Global Variables --- //
var apiKey = "398b829696d2df393c9e99a16af69903";
var atms = null // atm array

var accounts = null
var customers = null
var bills = null
var purchases = null


function main() {
  // use default values (geolocation too annoying)
  getRequest("accounts")
  getRequest("customers")
  getRequest("customers/56c66be5a73e49274150735f/bills")
  getRequest("accounts/56c66be6a73e492741507d64/purchases")
  getAtms(38.8960952, -77.1333157, 1)
}

// --- GET requests --- //
function getAccounts() {
  var content = ""
  var acct = null
  for(var i = 0; i < accounts.length; i++) {
    acct = accounts[i]
    content +=  "<b>Acct id: </b>" + acct._id + "<br/>" +
                "<b>Cust id: </b>" + acct.customer_id + "<br/>" +
                "<b>Nickname: </b>" + acct.nickname + "<br/><br/>"
  }
  writeInHtml("accounts", content)
}

function getCustomers() {
  var content = ""
  var cust = null
  for(var i = 0; i < customers.length; i++) {
    cust = customers[i]
    content +=  "<b>Cust id: </b>" + cust._id + "<br/>" +
                "<b>Name: </b>" + cust.first_name + " " + cust.last_name + "<br/><br/>" 
  }
  writeInHtml("customers", content)
}

function getBills() {
  var content = ""
  var bill = null
  for(var i = 0; i < bills.length; i++) {
    bill = bills[i]
    content +=  "<b>bill id: </b>" + bill._id + "<br/>" +
                "<b>status: </b>" + bill.status + "<br/>" +
                "<b>date: </b>" + bill.payment_amount + "<br/><br/>" 
  }
  writeInHtml("bills", content)
}

function getPurchases() {
  var content = ""
  var purchase = null
  console.log("hi")
  for(var i = 0; i < purchases.length; i++) {
    purchase = purchases[i]
    content +=  "<b>purchase id: </b>" + purchase._id + "<br/>" +
                "<b>status: </b>" + purchase.status + "<br/>" +
                "<b>date: </b>" + purchase.amount + "<br/><br/>" 
  }
  writeInHtml("purchases", content)

}

function updateAtmLocation() {
  var lat = map.getCenter().lat()
  var lng = map.getCenter().lng()
  getAtms(lat, lng, 1)
}

function getAtms(lat, lng, page) {
  $.ajax({
    url: "http://api.reimaginebanking.com/atms?lat=" + lat + "&lng=" + lng + 
    "&rad=10&key=" + apiKey + "&page=" + page,
    type: "GET",
    contentType: 'application/json',  // this is a required header
    success: function(resultsJson) {
      atms = resultsJson
      drawAllAtmMarkers()
      getAtms(lat, lng, ++page)
    }
  });
}

function drawAllAtmMarkers() {
  //console.log(atms)
  //writeInHtml("accounts", "ATM: " + atms.data[0].name)
  var atmData = atms.data
  var atm = null
  var i
  for(i = 0; i < atmData.length; i++) {
    atm = atmData[i]
    var title = atm.name
    var addr = atm.address
    var content = "<h3>" + title +"</h3>" +
                  "<b>Address: </b>" + addr.street_number + " " + addr.street_name + ", " +
                  " " + addr.city + " " + addr.state + " " + addr.zip + "<br/>" +
                  "<b>Hours: </b>" + atm.hours[0] + "<br/>" +
                  "<b>Accessibility: </b>"
     atm.accessibility ? content += "disabled friendly" : content += "no accessibility"

    drawAtmMarker(atm.geocode.lat, atm.geocode.lng, title, content)
  }
}

function writeInHtml(documentId, content) {
  document.getElementById(documentId).innerHTML = content
}

function getRequest(endpoint) {
  $.ajax({
    url: "http://api.reimaginebanking.com/" + endpoint + "?key=" + apiKey,
    type: "GET",
    contentType: 'application/json',  // this is a required header
    success: function(resultsJson) {
      switch(endpoint) {
        case "accounts":
          accounts = resultsJson
          getAccounts()
          break;
        case "customers":
          customers = resultsJson
          getCustomers()
          break;
        case "customers/56c66be5a73e49274150735f/bills":
          bills = resultsJson
          getBills()
          break;
        case "accounts/56c66be6a73e492741507d64/purchases":
          purchases = resultsJson
          getPurchases()
          break;
         break;
      }
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