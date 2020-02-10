$(() => {
  window.mapList = {};
  function createMap(map) {
    return `
    <div class="card">
    <article class="card-body map-list-item">
          <h3 class="card-text">${map.description}</h3>
        </article>
        </div>
    `
  }
  window.mapList.createMap = createMap;
});
