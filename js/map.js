"use strict"

var map
var markers = []

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.9339, lng: -77.1773},
    zoom: 12
  });
}

function drawAtmMarker(lat, lng, markerTitle, markerContent) {
  var infowindow = new google.maps.InfoWindow({
    content: markerContent
  });

  var marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
    title: markerTitle
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}