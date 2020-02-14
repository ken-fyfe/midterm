$(() => {

function getMyDetails() {

  return $.ajax({
    url: "/api/users/me",
  });
}
  function signUp(data) {
    return $.ajax({
      method: "POST",
      url: "/api/users/signup",
      data
    });
  }

  const $signUp= $(`
  <form class="signupform">
  <div class="form-row align-items-center">
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInput">Name</label>
      <input type="username" name="username" class="form-control mb-2" id="inlineFormInput" placeholder="Username">
    </div>
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInput">Name</label>
      <input type="email" name="email" class="form-control mb-2" id="inlineFormInputEmail" placeholder="Email">
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
  window.$signUp = $signUp;
  $signUp.on('submit', function(event) {
    event.preventDefault();
    if($(':input[type=username]').val() === ''||$(':input[type=email]').val() === ''||$(':input[type=password]').val()=== ''){
      alert('this form cannot be blank!')
    } else {
    const data = $(this).serialize();
    console.log("data", data)
    signUp(data)
    .then(getMyDetails)
    .then((json) => {
        console.log(json)
        header.update(json.user);
        addmaps.update(json.user);
        allmaps.update(json.user);
        mymaps.update(json.user);
        myfavs.update(json.user);
        mycollabs.update(json.user);
        views_manager.show('loggedIn');
      });
      $('input').val('')
    }

})

});
