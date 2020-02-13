$(() => {
    function getMyDetails() {
      return $.ajax({
        url: "/api/users/me"
      });
    }
    function getMyMaps() {
        return $.ajax({
          url: "/api/users/maps"
        });
      }
     
  
    window.mymaps = {};
  
    const $mymaps = $("#mymaps");
    let currentUser = null;
    function updateButton(user) {
      currentUser = user;
      $mymaps.find("#mymapsbutton").remove();
      let userButton;
      if (user) {
        userButton = `<img id="mymapsbutton" src="/images/mymaps.png">`;
      } else {
        userButton = ``;
      }
  
      $mymaps.append(userButton);
    }
    window.mymaps.update = updateButton;
  
    getMyDetails().then(function(json) {
      console.log(json, "inside button");
      updateButton(json.user);
    });
    $("#mymaps").on("click", () => {
        getMyMaps().then(function(json) {
            all_maps.addMaps(json.maps);
        
            views_manager.show("allMaps");
          });
    });
  });
  