$(() => {
  const getMyPins = function() {
    console.log("This is getMyPins");
    return $.ajax({
      url: "/api/users/pins",
    });
  };
  getMyPins().then(json => console.log('pins', json));
});
