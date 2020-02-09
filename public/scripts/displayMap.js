const displayMaps = function(L) {
  const mymap = L.map('map-thumbnail');

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11'
  }).addTo(mymap);

  // pin configuration and display
  const pinCoords = [51.5, -0.09];
  const pinName = 'Eats \'n Treats';
  const pinRating = 4.4;
  const hoverText = 'Hover Text';
  const imgURL = 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png';
  const imgHeight = 86;
  const imgWidth = 82;

  L.marker(pinCoords, { title: hoverText }).addTo(mymap)
    .bindPopup(`<img src=${imgURL} style="width:${imgWidth}px; height:${imgHeight}px">
                <br /><b>${pinName}</b><br />${pinRating} ⭐️`);

  // map region configuration and display
  const latMin = 51.49;
  const latMax = 51.55;
  const longMin = -0.02;
  const longMax = -0.10;

  const latlongs = [
    [latMax, longMax],
    [latMax, longMin],
    [latMin, longMin],
    [latMin, longMax]
  ];

  const polyOptions = {color: 'red', weight: 1, fillOpacity: 0.05, lineCap: 'round'};
  const mapName = "Joe's London Map";
  const mapRating = 3.7;

  const poly = L.polygon(latlongs, polyOptions)
                .addTo(mymap)
                .bindPopup(`<b>${mapName}</b><br />${mapRating} ⭐️`);

  // scales map to contain polygon
  mymap.fitBounds(poly.getBounds());
};
