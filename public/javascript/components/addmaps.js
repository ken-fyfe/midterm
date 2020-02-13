$(() => {
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }

  window.addmaps = {};

  const $addmaps = $("#addmaps");
  let currentUser = null;
  function updateButton(user) {
    currentUser = user;
    $addmaps.find("#addmapsbutton").remove();
    let userButton;
    if (user) {
      userButton = `<img id="addmapsbutton" src="/images/newmap.png">`;
    } else {
      userButton = ``;
    }

    $addmaps.append(userButton);
  }
  window.addmaps.update = updateButton;

  getMyDetails().then(function(json) {
    console.log(json, "inside button");
    updateButton(json.user);
  });
  $("#addmaps").on("click", () => {
    views_manager.show("addmap_form");
  });
});
