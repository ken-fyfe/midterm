$(() => {
  function getMyMaps() {
    console.log("getMyMaps");
    return $.ajax({
      url: "/api/users/maps",
    });
  }
  getMyMaps()
  .then(function(json) {
    console.log('maps', json);
    all_maps.addMaps(json.maps);


  views_manager.show('allMaps');
  });

});
