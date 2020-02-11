$(() => {
  const $all_maps = $(`
  

  <section class="all_maps" id="all_maps">
      <p>Loading...</p>
    </section>
  `);
  window.$all_maps = $all_maps;
  window.all_maps = {};
  function addMap(mapMarkUp) {
    $all_maps.append(mapMarkUp);
  }
  function clearMaps() {
    $all_maps.empty();
  }
  function addMaps(maps) {
    clearMaps();
    for (let i = 0; i < maps.length; i++) {
      const mapObj = maps[i];

      const mapMarkUp = mapList.createMap(mapObj, i);
      addMap(mapMarkUp);
    }
  }
  window.all_maps.addMaps = addMaps;
});
