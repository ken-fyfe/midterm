$(() => {
  const $main = $('#main-content');
  window.views_manager = {};
  window.views_manager.show = function(item) {

    $logInForm.detach();
    $signUp.detach();
    $loggedIn.detach();
    $all_maps.detach();
    $createMapForm.detach();

    switch (item) {
      case 'logIn':
        $logInForm.appendTo($main);
        break;
        case 'loggedIn':
        $loggedIn.appendTo($main);
        break;
        case 'signUp':
          $signUp.appendTo($main);
          break;
        case 'allMaps':
        $all_maps.appendTo($main);
        break;
        case 'addmap_form':
          $createMapForm.appendTo($main);
          break;
    }
  };
});
