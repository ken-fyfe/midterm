

$(() => {
    function logIn(data) {
        console.log("data",data)
        return $.ajax({
          method: "POST",
          url: "/api/users/login",
          data
        });
      }

  const $logInForm = $(`
<form>
  <div class="form-row align-items-center">
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInput">Name</label>
      <input type="email" name="email" class="form-control mb-2" id="inlineFormInput" placeholder="Jane Doe">
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
  $logInForm.on('submit', function(event) {
      
      event.preventDefault();
      const data = $(this).serialize();
      console.log("data", data)
    logIn(data)
      .then(json => {
        console.log("data",json);
        if (!json.user) {
            console.log("data1",json);

          views_manager.show('error', 'Failed to login');
          return;
        }
        console.log("data2",json);

        console.log(json.user);
        header.update(json.user);
        views_manager.show('loggedIn');
      });
  });
 
});