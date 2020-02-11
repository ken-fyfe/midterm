$(() => {
  window.mapList = {};
  function createMap(map, n) {
    const mapObject = {
      latitude: map.latitude,
      longitude: map.longitude,
      zoom_level: map.zoom_level,
      number: n
    };

    const bigMapObject = {
      latitude: map.latitude,
      longitude: map.longitude,
      zoom_level: map.zoom_level
    };
    return `
    <div class="card">

    <div class="card-image-top mx-auto" id="smallmapdiv${n}">
    <script>$('#smallmapdiv' + ${n}).on('click', () => {
    currentMap.update(${JSON.stringify(mapObject)})})

</script>
<script>
      currentLocationsmallmap(${JSON.stringify(mapObject)});
      </script>
      </div>
    <div class="card-body">
    <h5 class="card-title">${map.title}</h5>
    <p class="card-text">${map.description}</p>
        
        </div>
        </div>
    `;
  }
  window.mapList.createMap = createMap;
});

