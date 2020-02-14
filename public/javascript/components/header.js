$(() => {
  function getMyDetails() {
    return $.ajax({
      url: "/api/users/me"
    });
  }
  function logOut() {
    return $.ajax({
      method: "POST",
      url: "/api/users/logout"
    });
  }
  function getMyMaps() {
    return $.ajax({
      url: "/api/users/maps"
    });
  }

  window.header = {};

  const $pageHeader = $("#page-header");
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;
    if (user) {
      userLinks = `
      <div class="pos-f-t" id="page-header__user-links">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h5 class="text-white h4">Collapsed content</h5>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">
          <img id="logo" src="./images/aeroplane.png" width="50" height="50" alt="Concorde App">
          <div class="headertext">Welcome ${user.username}</div>
          <button type="button" class="btn btn-primary logout_button">Log Out</button>
        </nav>
      </div>`;
    } else {
      userLinks = `
      <div class="pos-f-t" id="page-header__user-links">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h5 class="text-white h4">Collapsed content</h5>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">
          <img src="./images/aeroplane.png" width="50" height="50" alt="Concorde App">
          <div>
            <button type="button" class="btn btn-primary signup_button">Sign Up</button>
            <button type="button" class="btn btn-primary login_button">Login</button>
          </div>
        </nav>
      </div>`;
    }
    $pageHeader.append(userLinks);
  }
  window.header.update = updateHeader;

  getMyDetails().then(function(json) {
    updateHeader(json.user);
  });
  updateHeader();
  $("header").on("click", ".login_button", () => {
    views_manager.show("logIn");
  });
  $("header").on("click", ".signup_button", () => {
    views_manager.show("signUp");
  });

  $("header").on("click", ".logout_button", () => {
    logOut()
      .then(() => {
        header.update(null);
        addmaps.update(null);
        dropPin.update(null);
        allmaps.update(null);
        mymaps.update(null);
        myfavs.update(null);
      })
      .then(getMyMaps)
      .then(function(json) {
        all_maps.addMaps(json.maps);
        views_manager.show("allMaps");
      });
  });
});
