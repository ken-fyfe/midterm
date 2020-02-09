$(() => {
    const $main = $('#main-content');
    window.views_manager = {};
    window.views_manager.show = function(item) {
    
      $logInForm.detach();
      switch (item) {
    
        case 'logIn':
          $logInForm.appendTo($main);
          break;
          case 'loggedIn':
          $loggedIn.appendTo($main);
          break;
        }
      
    }
  });