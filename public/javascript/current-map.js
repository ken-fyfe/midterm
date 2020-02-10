$(() => {
window.currentMap = {};

  const $currentMap = $("#maps-div");
  function updateMap(mapObj) {
    console.log(mapObj, "we're here!");
    $currentMap.find("#current-map").remove();
    let mapLinks;
    if (!mapObj) {
      console.log("we have no mapObj");
      mapLinks = `<div id="current-map">
      <script>currentLocation()</script>
      </div>`;
    } else {
      console.log('here is mapObj', mapObj);
      mapLinks = `<div id="current-map">
      <script>
      currentLocation(${JSON.stringify(mapObj)});
    </script>
      </div>`;
    }

    $currentMap.append(mapLinks);
  }
  window.currentMap.update = updateMap;
  const particularMap = {
    latitude: 25.7839,
    longitude: -80.2102,
    zoom_level: 10
  };
  console.log(particularMap, "particular map");
  updateMap(particularMap);


});
