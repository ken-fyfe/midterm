$(() => {
  function createMap(data) {
    //console.log("data",data)
    return $.ajax({
      method: "POST",
      url: "/api/users/createMap",
      data
    });
  }
  function getMyMaps() {
    return $.ajax({
      url: "/api/users/maps"
    });
  }

  const $createMapForm = $(`
    <form class="signupform">
      <div class="form-row align-items-center">
        <div class="col-auto">
          <label class="sr-only" for="inlineFormInput">Name</label>
          <input type="name" name="name" class="form-control mb-2" id="inlineFormInput" placeholder="Map title">
        </div>
        <div class="col-auto">
          <label class="sr-only" for="inlineFormInputGroup">Description</label>
          <div class="input-group mb-2">
            <input type="textarea" name="desciption" class="form-control"  placeholder="Map description">
          </div>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-2">Create map</button>
        </div>
      </div>
    </form>
  `);
  window.$createMapForm = $createMapForm;
  $createMapForm.on("submit", function(event) {
    event.preventDefault();
    if($(':input[type=name]').val() === ''||$(':input[type=textarea]').val()=== ''){
      alert('This form cannot be blank!')
    } else {
    const data = $(this).serialize();
    console.log("data",data)
    createMap(data)
      .then(getMyMaps)
      .then(function(json) {
        console.log("maps", json);
        all_maps.addMaps(json.maps);
        views_manager.show("allMaps");
      });
      $('input').val('');
    }

  });
});
