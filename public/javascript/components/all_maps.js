$(() => {
  const $all_maps = $(`
  

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
