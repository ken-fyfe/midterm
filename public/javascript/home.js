$(() => {
  function getMyMaps() {
    return $.ajax({
      url: "/api/users/maps"
    });
  }
  getMyMaps().then(function(json) {
    all_maps.addMaps(json.maps);

    views_manager.show("allMaps");
  });
});
