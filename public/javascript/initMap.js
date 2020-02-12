// callback function for Google Maps API
// const initMap = function() { // Initialize and add the map
function initMap() { // Initialize and add the map
  // let lat = 0;
  // let lng = 0;
  // const showLocation = function(position) {
  //   lat = position.coords.latitude;
  //   lng = position.coords.longitude;
  const showLocation = function(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("Latitude : " + lat + " Longitude: " + lng);
    const posn = {lat, lng};
    mymap = new google.maps.Map(document.getElementById('map-current-location'), {zoom: 15, center: posn});
    console.log('mymap in initMap :', mymap);
    marker = new google.maps.Marker({position: posn, map: mymap, animation: google.maps.Animation.DROP});
  }

  const errorHandler = function(err) {
    if(err.code == 1) {
       alert("Error: Access is denied!");
    } else if( err.code == 2) {
       alert("Error: Position is unavailable!");
    }
  }

  const getLocation = function() {
    if(navigator.geolocation) {
      var options = { timeout: 10000 };// timeout at 10000 milliseconds (10 seconds)
      navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
       alert("Your browser does not support geolocation!");
    }
  }
  getLocation();
};
