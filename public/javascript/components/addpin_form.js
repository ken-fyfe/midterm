$(() => {
    function createPin(data) {
      //console.log("data",data)
      return $.ajax({
        method: "POST",
        url: "/api/users/createPin",
        data
      });
    }
    function addMapPin() {
      //console.log("data",data)
      return $.ajax({
        method: "POST",
        url: "/api/users/addMapPin",
      });
    }

    const $createPinForm = $(`
      <form class="signupform">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <label class="sr-only" for="inlineFormInput">Name</label>
            <input type="name" name="name" class="form-control mb-2" id="inlineFormInput" placeholder="Pin title">
          </div>
          <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Description</label>
            <div class="input-group mb-2">
              <input type="textarea" name="description" class="form-control"  placeholder="Pin description">
            </div>
          </div>
          <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Category</label>
            <div class="input-group mb-2">
              <select id="pin-dropdown" name="category">
                <option value="Historial">Historical</option>
                <option value="Kodal Moment">Kodak Moment</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Bar">Bar</option>
                <option value="Night Club">Night Club</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-2">Create pin</button>
          </div>
        </div>
      </form>
    `);

  // <input type="name" name="category" class="form-control"  placeholder="Pin category">

    window.$createPinForm = $createPinForm;
    $createPinForm.on("submit", function(event) {
      event.preventDefault();
      $('input').val('');
      const data = $(this).serialize();
      console.log("data", data)
      createPin(data).then(json => {
        currentMap.addPopup(json.newPinObj)
      }).then(addMapPin)
      views_manager.show("allMaps");
    });
  });
