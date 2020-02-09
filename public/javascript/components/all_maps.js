$(() => {
  const $all_maps = $(`
  <head>
	<title>Current Location - Leaflet</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
  <script src="currentLocation.js"></script>
	<style>
		html, body {
			height: 100%;
      padding: 0;
			margin: 0;
		}
		#map-current-location {
			width: 300px;
			height: 400px;
		}
	</style>
</head>
<body>

<div id='map-current-location'></div>
<script>currentLocation(L)</script>

</body>
  <section class="all_maps" id="all_maps">
      <p>Loading...</p>
    </section>
  `);
window.$all_maps = $all_maps;
window.all_maps = {};
function addMap(mapMarkUp) {
  $all_maps.append(mapMarkUp)
}
function clearMaps() {
  $all_maps.empty();
}
  function addMaps(maps) {
    clearMaps();
    for (const map of maps) {
      //const mapObj = maps[mapId];
      const mapMarkUp = mapList.createMap(map);
      addMap(mapMarkUp);
    }
  }
window.all_maps.addMaps = addMaps;
});
