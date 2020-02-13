$(() => {
  function addPinToDb(data) {
    return $.ajax({
      method: "POST",
      url: "/api/users/addPin",
      data
    });
  }
  function addMapToDb(data) {
    return $.ajax({
      method: "POST",
      url: "/api/users/addMap",
      data
    });
  }

  const getMyPins = function() {
    console.log("This is getMyPins");
    return $.ajax({
      url: "/api/users/pins"
    });
  };
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }
  window.currentMap = {};
  const $currentMap = $("#maps-div");

  const map = L.map("map-current-location");

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11"
    }
  ).addTo(map);
  const onLocationFound = function(e) {
    L.marker(e.latlng).addTo(map);
    console.log(e.latlng, 'location');
  };
  const onLocationError = function(e) {
    alert(e.message);
  };
  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);
  map.locate({ setView: true, maxZoom: 16 });


  getMyPins().then(pinArray => {
    console.log(pinArray.pins);
    for (let pin in pinArray.pins) {
      const mapLong = pinArray.pins[pin].longitude;
      const mapLat = pinArray.pins[pin].latitude;
      const mapTitle = pinArray.pins[pin].title;
      const mapDesc = pinArray.pins[pin].description;
      L.marker([mapLat, mapLong])
        .addTo(map)
        .bindPopup(`<b>${mapTitle}</b><br />${mapDesc}`)
    }
  });

  function updateMap(coodObj) {
    if (coodObj) {
      const lat = Number(coodObj.latitude);
      const long = Number(coodObj.longitude);
      const zoomLevel = Number(coodObj.zoom_level);
      getMyDetails()
      .then(function( json ) {
      dropPin.update(json.user);
    });
      map.flyTo([lat, long], zoomLevel, { duration: 5 });


    }
  }
  window.currentMap.update = updateMap;

  function addPin() {
    map.on("click", function(e) {
      const myCoords = e.latlng;
      coordsObject = {lat: myCoords.lat, lng: myCoords.lng}
      addPinToDb(coordsObject);
      views_manager.show("addpin_form");
      L.marker(e.latlng).addTo(map);
      $("#addPinAlert").hide();
      map.off("click");
    });
  }
  window.currentMap.addPin = addPin;

  function addMap() {
    map.on("click", function(e) {
      const myCoords = e.latlng;
      const zoomLevel  = map.getZoom();
      coordsObject = {lat: myCoords.lat, lng: myCoords.lng, zoomLevel}
      addMapToDb(coordsObject);
      views_manager.show("addmap_form");
      L.marker(e.latlng).addTo(map);
      $("#addMapAlert").hide();
      map.off("click");
    });
  }
  window.currentMap.addMap = addMap;
  updateMap();
});


