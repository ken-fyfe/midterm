const currentLocationsmallmap = function(mapObject) {
  // const mapOb = JSON.parse(mapObject)
  const m = mapObject["number"];

  const mymap = L.map(`smallmapdiv${m}`, { zoomControl: false }).setView(
    [mapObject.latitude, mapObject.longitude],
    mapObject.zoom_level
  );
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    { id: "mapbox/streets-v11" }
  ).addTo(mymap);
};
