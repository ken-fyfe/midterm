$(() => {
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }
  function getAllMaps() {
    return $.ajax({
      url: "/api/users/allmaps"
    });
  }

  window.allmaps = {};

  const $allmaps = $("#allmaps");
  let currentUser = null;
  function updateButton(user) {
    currentUser = user;
    $allmaps.find("#allmapsbutton").remove();
    let userButton;
    if (user) {
      userButton = `<img id="allmapsbutton" src="/images/allmaps.png">`;
    } else {
      userButton = ``;
    }

    $allmaps.append(userButton);
  }
  window.allmaps.update = updateButton;

  getMyDetails().then(function(json) {
    console.log(json, "inside button");
    updateButton(json.user);
  });
  $("#allmaps").on("click", () => {
    getAllMaps().then(function(json) {
      all_maps.addMaps(json.maps);

      views_manager.show("allMaps");
    });
  });
});
