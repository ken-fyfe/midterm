// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
//   function logIn(data) {
//     return $.ajax({
//       method: "POST",
//       url: "/users/login",
//       data
//     });
//   }
// });
