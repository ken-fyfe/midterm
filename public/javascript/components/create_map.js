$(() => {
  window.mapList = {};
  function createMap(map, n) {
  const mapObject = {
    latitude: map.latitude,
    longitude: map.longitude,
    zoom_level: map.zoom_level,
    number: n
    
  }
  console.log("inside create map", mapObject)
    return `
    
    <div class="card" id="smallmapdiv${n}">
          
<script>
console.log("smallmapdiv${n}")
      currentLocationsmallmap(${JSON.stringify(mapObject)});
    </script>
        
        </div>
    `
  }
  window.mapList.createMap = createMap;
});
{/* <div id="smallmapdiv${n}"></div> */}
