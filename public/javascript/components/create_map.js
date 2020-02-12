$(() => {
 

  window.mapList = {};
  function createMap(map, n) {
    const mapObject = {
      mapId: map.id,
      latitude: map.latitude,
      longitude: map.longitude,
      zoom_level: map.zoom_level,
      number: n
    };

  
    return `
    <div class="card" id="smallmapcard${n}">

    <div class="card-image-top mx-auto" id="smallmapdiv${n}">
    <script>$('#smallmapcard${n}').on('click', () => {
      function addMapIdCookie(data) {
        return $.ajax({
          method: "POST",
          url: "/api/users/addMapId",
          data
        });
      }
      addMapIdCookie(${JSON.stringify(mapObject)})
    currentMap.update(${JSON.stringify(mapObject)})})

</script>
<script>
      currentLocationsmallmap(${JSON.stringify(mapObject)});
      </script>
      </div>
    <div class="card-body">
    <h5 class="card-title">${map.title} <img class="heart" id="heart${n}" src="/images/notlike.png">
    </h5>
    <p class="card-text">${map.description}</p>
        <script>
        function getMapDetails(data) {
          return $.ajax({
            method: "POST",
            url: "/api/users/details",
            data
          });
        }
        function getMapLikes(data) {
          return $.ajax({
            method: "POST",
            url: "/api/users/likes",
            data
          });
        }
        $('#heart${n}').click(function() {
          $(this).attr("src", "/images/like.png");
          getMapDetails(${JSON.stringify(mapObject)});
           getMapLikes(${JSON.stringify(mapObject)})
          .then((json) => {
            console.log(json.likes.count, "data")
            likes.update(json.likes.count)})
        });</script>

        </div>
        </div>
    `;
  }
  window.mapList.createMap = createMap;
});

