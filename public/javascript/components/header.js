$(() => {
  console.log('window ready')
  window.header = {};

  const $pageHeader = $('#page-header');
  //let currentUser = null;
  function updateHeader() {
    //currentUser = user;
   // $pageHeader.find("#page-header__user-links").remove();
    let userLinks;
userlinks=`<h1>this is a geader<h1>`
    // if (!user) {
    //   userLinks = ``
    // } else {
    //   userLinks = `
    //   <li>${user.name}</li>`
    // }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateHeader;

  // getMyDetails()
  //   .then(function( json ) {
  //   updateHeader(json.user);
  // });
updateHeader();
});
