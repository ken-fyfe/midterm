$(() => {
  const getMyPins = function() {
    console.log("This is getMyPins");
    return $.ajax({
      url: "/api/users/pins",
    });
  };
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
  };
  const onLocationError = function(e) {
    alert(e.message);
  };
  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);
  map.locate({ setView: true, maxZoom: 16 });
  // L.Control.geocoder().addTo(map);

  getMyPins().then(pinArray => {
    console.log(pinArray.pins);
    for (let pin in pinArray.pins) {
      const mapLong = pinArray.pins[pin].longitude;
      const mapLat = pinArray.pins[pin].latitude;
      const mapTitle = pinArray.pins[pin].title;
      const mapDesc = pinArray.pins[pin].description;
      L.marker([mapLat, mapLong])
       .addTo(map)
       .bindPopup(`<b>${mapTitle}</b><br />${mapDesc}`).openPopup();
    }
  });

  function updateMap(coodObj) {
    if (coodObj) {
      const lat = Number(coodObj.latitude);
      const long = Number(coodObj.longitude);
      const zoomLevel = Number(coodObj.zoom_level)

      map.flyTo([lat, long], zoomLevel, {duration: 5});
    }
  }
  window.currentMap.update = updateMap;

  updateMap();
});
