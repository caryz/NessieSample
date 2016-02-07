"use strict"

// --- variables --- //
var map
var markers = []

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.8960952, lng: -77.1333157},
    zoom: 11
  });

  google.maps.event.addListener(map,'idle',function(){
    if(!this.get('dragging') && this.get('oldCenter') && this.get('oldCenter')!==this.getCenter()) {
      deleteMarkers()
      updateAtmLocation()
      // center
      var lat = map.getCenter().lat()
      var lng = map.getCenter().lng()
      var m = new google.maps.Marker({
            map: map,
            position: {lat, lng},
            icon: 'asset/blueMarker.png',
        });
      markers.push(m)
    }
    if(!this.get('dragging')){
     this.set('oldCenter',this.getCenter())
    }
  });

  google.maps.event.addListener(map,'dragstart',function(){
    this.set('dragging',true);          
  });

  google.maps.event.addListener(map,'dragend',function(){
    this.set('dragging',false);
    google.maps.event.trigger(this,'idle',{});
  });
}

// --- Markers --- //

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
