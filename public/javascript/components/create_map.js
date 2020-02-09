$(() => {
  window.mapList = {};
  function createMap(map) {
    return `
    <article class="map-list-item">
        <section class="map-list-item-image">
          <h1>${map.description}</h1>
        </section>
        </article>
    `
  }
  window.mapList.createMap = createMap;
});
