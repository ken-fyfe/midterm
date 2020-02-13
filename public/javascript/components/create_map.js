$(() => {
  window.mapList = {};
  const $likes = $("#likesdiv");
  let currentNumber = null;
  function updateLikes(num) {
    currentNumber = num;
    $likes.find("#mapLikes").remove();
    let likeLinks;
    if (!num) {
      likeLinks = `0`;
    } else {
      likeLinks = `<div id="mapLikes">
          ${num}
      </div>`;
    }
    $likes.append(likeLinks);
  }
  window.mapList.updateLikes = updateLikes;
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
      <img class="heart" id="heart${n}" src="/images/notlike.png">
      <div class="heart-text"  id="likesdiv${n}"><script>  
     
      function getMapLikes(data) {
        return $.ajax({
          method: "POST",
          url: "/api/users/likes",
          data,
        });
      }
        getMapLikes(${JSON.stringify(mapObject)}).then(json =>{
          console.log(json, "first")
          
            $("#likesdiv${n}").text(json.likes.count)})</script></div>
            <h6 class="card-title">${
              map.title
            } 
            </h6>
        <div class="card-image-top mx-auto" id="smallmapdiv${n}">
          <script>$('#smallmapdiv${n}').on('click', () => {
            currentMap.update(${JSON.stringify(mapObject)})})
          </script>
          <script>
            currentLocationsmallmap(${JSON.stringify(mapObject)});
          </script>
        </div>
        <div class="card-body">
         
          <p class="card-text">${map.description}</p>
          <script>
          function getMapDetails(data) {
            return $.ajax({
              method: "POST",
              url: "/api/users/details",
              data
            });
          }
            function addMapLike(data) {
              return $.ajax({
                method: "POST",
                url: "/api/users/addUserLike",
                data
              });
            }

            function getMapLikes(data) {
        return $.ajax({
          method: "POST",
          url: "/api/users/likes",
          data,
        });
      }


            $('#heart${n}').click(function() {
              getMapDetails(${JSON.stringify(mapObject)})
              .then(json =>
                { console.log(Number(json.countNum), 'countNum')
                  if(Number(json.countNum) === 0) {
                  console.log("in hereee")
              addMapLike(${JSON.stringify(mapObject)})
              currentValue = $("#likesdiv${n}").val()
   $("#likesdiv${n}").text(currentValue + 1)
             } else {
             getMapLikes(${JSON.stringify(mapObject)}).then(json =>{
                    console.log(json, "in here again")
       $("#likesdiv${n}").text(json.likes.count)
            }) }
          })
            })
          </script>
        </div>
      </div>
    `;
  }
  window.mapList.createMap = createMap;
});


// $("#heart${n}").attr("src", "/images/like.png");
