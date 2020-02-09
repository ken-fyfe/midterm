// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 5000;
const ENV        = process.env.ENV || "development";
const path = require('path');
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['thisIsMyVerySecretKey'],
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, './public')));



// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above



// if (!userId) {
//   res.send({ message: "not logged in" });

//   return;
// }
// return


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {

const userId = req.session.userId;
console.log("inside the server", userId);
if (userId) {
  db
    .query(
      `
  SELECT *
  FROM users
  WHERE id = $1`,[userId]
  )
  .then(user1 => {
    if (!user1) {
      res.send({ error: "no user with that id" });
      return;
    }

    const userobj = {
      password: user1.rows[0].password,
      username: user1.rows[0].username,
      id: user1.rows[0].id
    };
    const templateVars = { user: userobj}

    //console.log(userobj, "from server");
    res.render("index",templateVars)
  })

} else {
  const templateVars = { user: null}
  res.render("index",templateVars)

}

});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
