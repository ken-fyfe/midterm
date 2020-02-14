$(() => {
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }
  function getCollabMaps() {
      return $.ajax({
        url: "/api/users/collabs"
      });
    }


  window.mycollabs = {};

  const $mycollabs = $("#mycollabs");
  let currentUser = null;
  function updateButton(user) {
    currentUser = user;
    $mycollabs.find("#mycollabsbutton").remove();
    let userButton;
    if (user) {
      userButton = `<img id="mycollabsbutton" src="/images/mycollabs.png">`;
    } else {
      userButton = ``;
    }

    $mycollabs.append(userButton);
  }
  window.mycollabs.update = updateButton;

  getMyDetails().then(function(json) {
    console.log(json, "inside button");
    updateButton(json.user);
  });
  $("#mycollabs").on("click", () => {
      getCollabMaps().then(function(json) {
          all_maps.addMaps(json.maps);

          views_manager.show("allMaps");
        });
  });
});
