
const currentLocation = function(mapObject) {
  // const mapOb = JSON.parse(mapObject)
  console.log('mapObject', mapObject);
  if(!mapObject){
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
    map.locate({ setView: true, maxZoom: 16 })
  } else {

    const mymap = L.map('map-current-location').setView([mapObject.latitude, mapObject.longitude], mapObject.zoom_level);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11'
    }).addTo(mymap);
  }
  };
