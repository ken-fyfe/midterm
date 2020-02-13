$(() => {
  function logIn(data) {
    //console.log("data",data)
    return $.ajax({
      method: "POST",
      url: "/api/users/login",
      data
    });
  }
  function getMyMaps() {
    console.log("getMyMaps");
    return $.ajax({
      url: "/api/users/maps"
    });
  }

  const $logInForm = $(`
    <form class="signupform">
      <div class="form-row align-items-center">
        <div class="col-auto">
          <label class="sr-only" for="inlineFormInput">Name</label>
          <input type="email" name="email" class="form-control mb-2" id="inlineFormInput" placeholder="Email">
        </div>
        <div class="col-auto">
          <label class="sr-only" for="inlineFormInputGroup">Username</label>
        <div class="input-group mb-2">

        <input type="password" name="password" class="form-control" id="inlineFormInputGroup" placeholder="Password">
      </div>
      </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </div>
      </div>
    </form>
  `);
  window.$logInForm = $logInForm;
  $logInForm.on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data)

    logIn(data)
      .then(json => {
        if (!json.user) {
          views_manager.show("error", "Failed to login");
          return;
        }
        header.update(json.user);
        addmaps.update(json.user);
        allmaps.update(json.user);
        mymaps.update(json.user);
      })
      .then(getMyMaps)
      .then(function(json) {
        console.log("maps", json);
        all_maps.addMaps(json.maps);
        views_manager.show("allMaps");
      });
  });
});
