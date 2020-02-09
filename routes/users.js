/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const database = require('../server/database.js');

const bcrypt = require('bcrypt');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
//check if a registered user exists by comparing password with hashed password
  const login =  function(email, password) {
     db.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, [email])
    // .then(res => console.log(res.rows[0]))
    
    .then(res => {
      if (bcrypt.compareSync(password, res.rows[0].password)) {
        return res.rows[0];
        
      }
      
      
      console.log(res.rows[0].password)
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });
  return router;
};
