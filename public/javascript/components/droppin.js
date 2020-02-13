$(() => {
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }

  window.dropPin = {};

  const $dropPin = $("#dropPin");
  let currentUser = null;
  function updateButton(user) {
    currentUser = user;
    $dropPin.find("#addpinbutton").remove();
    let userButton;
    if (!user) {
      userButton = ``;
    } else {
      userButton = `<img id="addpinbutton" src="/images/addpin.png">`;
    }

    $dropPin.append(userButton);
  }
  window.dropPin.update = updateButton;

  getMyDetails().then(function(json) {
    updateButton(json.user);
  });
  $("#dropPin").on("click", () => {
      $(".alert").show()
currentMap.addPin()
  });
});
