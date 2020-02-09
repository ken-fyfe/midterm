$(() => {
    console.log("header")
    window.header = {};

    const $pageHeader = $('#page-header');
    // let currentUser = null;
    function updateHeader() {
      // currentUser = user;
      // $pageHeader.find("#page-header__user-links").remove();
      let userLinks;


        userLinks = `<div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h5 class="text-white h4">Collapsed content</h5>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <button type="button" class="btn btn-primary">Invest now!</button>
          <button type="button" class="btn btn-primary login_button">Login</button>

        </nav>
      </div>`




      $pageHeader.append(userLinks);
  }
    window.header.update = updateHeader;

    // getMyDetails()
    //   .then(function( json ) {
    //   updateHeader(json.user);
    // });
  updateHeader();
  $("header").on('click', '.login_button', () => {
    views_manager.show('logIn');
  });
  });

