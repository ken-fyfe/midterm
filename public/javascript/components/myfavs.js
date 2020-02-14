$(() => {
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }
  function getFavMaps() {
      return $.ajax({
        url: "/api/users/favs"
      });
    }


  window.myfavs = {};

  const $myfavs = $("#myfavs");
  let currentUser = null;
  function updateButton(user) {
    currentUser = user;
    $myfavs.find("#myfavsbutton").remove();
    let userButton;
    if (user) {
      userButton = `<img id="myfavsbutton" src="/images/myfavs.png">`;
    } else {
      userButton = ``;
    }

    $myfavs.append(userButton);
  }
  window.myfavs.update = updateButton;

  getMyDetails().then(function(json) {
    console.log(json, "inside button");
    updateButton(json.user);
  });
  $("#myfavs").on("click", () => {
      getFavMaps().then(function(json) {
          all_maps.addMaps(json.maps);

          views_manager.show("allMaps");
        });
  });
});
