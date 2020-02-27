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
          data,

        });
      }

      function getMyDetails() {
        return $.ajax({
          url: "/api/users/me"
        });
      }

      getMyDetails().then(function(json) {
        if(json.user) {
          getMapDetails(${JSON.stringify(mapObject)})
              .then(json =>{
                  if(Number(json.countNum) !== 0) {
                    $("#heart${n}").attr("src", "/images/like.png");
                  }})
          getMapLikes(${JSON.stringify(mapObject)}).then(json =>{
            console.log(json)
              $("#likesdiv${n}").text(json.likes.count)})
        }
      });
        </script></div>
            <h6 class="card-title">${
              map.title
            }
            </h6>
        <div class="card-image-top mx-auto" id="smallmapdiv${n}">
          <script>
          function setMapId(data) {
            return $.ajax({
              method: "POST",
              url: "/api/users/setMapId",
              data
            });
          }

          $('#smallmapdiv${n}').on('click', () => {

            setMapId(${JSON.stringify(mapObject)})
            currentMap.update(${JSON.stringify(mapObject)})})
          </script>
          <script>
            currentLocationsmallmap(${JSON.stringify(mapObject)});
          </script>
        </div>
        <div class="card-body">

          <div class="block-with-text" class="card-text">${map.description}</div>
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

            function getMyDetails() {
              return $.ajax({
                url: "/api/users/me"
              });
            }
            $('#heart${n}').click(function() {
              $("#heart${n}").attr("src", "/images/like.png");
              getMyDetails().then(function(json) {
                if(json.user) {
              getMapDetails(${JSON.stringify(mapObject)})
              .then(json =>{
                console.log(Number(json.countNum), 'countNum')
                  if(Number(json.countNum) === 0) {
                   const currentValue = (Number($("#likesdiv${n}").text())+1);
                   $("#likesdiv${n}").text(currentValue)
                  console.log("in hereee we don't already like this!")
              addMapLike(${JSON.stringify(mapObject)})
             }
          })
        }
        })
        })
          </script>
        </div>
      </div>
    `;
  }
  window.mapList.createMap = createMap;
});


// currentValue = (Number($("#likesdiv${n}").val()) + 1)
//               console.log(typeof currentValue)
//    $("#likesdiv${n}").text(currentValue)

//$('#aeroplaneImg').show();
