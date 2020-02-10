/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const database = require("../server/database.js");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/signup", (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    const userValues = [user["username"], user["email"], user["password"]];

    return db
      .query(`
        INSERT INTO users (
        username, email, password)
        VALUES (
        $1, $2, $3)
        RETURNING *;`, userValues)
      .then(res => {
        if (!res) {
          res.send({ error: "error" });
          return;
        }
        const user = {
          password: res.rows[0].password,
          username: res.rows[0].username,
          id: res.rows[0].id
        };
        req.session.userId = user.id;
        //console.log(user);
        // console.log(user.id)
        console.log(req.session.userId, "cookie");
        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });

  //check if a registered user exists by comparing password with hashed password
  const login = function(email, password) {
    return (
      db
        .query(`
          SELECT *
          FROM users
          WHERE email = $1;
          `, [email])
        .then(res => {
          if (bcrypt.compareSync(password, res.rows[0].password)) {
            const userobj = {
              password: res.rows[0].password,
              username: res.rows[0].username,
              id: res.rows[0].id
            };
            return userobj;
          }
          return null;
        })
    );
  };
  exports.login = login;

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;

        res.send({ user });
      })
      .catch(e => res.send(e));
  });

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });

      return;
    }
    return db
      .query(`
        SELECT *
        FROM users
        WHERE id = $1;
        `, [userId])
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
        const user = userobj;
        res.send({ user });
      })
      .catch(e => res.send(e));
  });

  router.get("/maps", (req, res) => {
    const userId = req.session.userId;
    console.log('inside maps', userId);
    if (!userId) {
      return db
        .query(`
          SELECT *
          FROM maps;
          `)
        .then(mapsData => {
          const maps = mapsData.rows;
          res.send({ maps });
        }
        ).catch(e => res.send(e));
    }
    return db
      .query(`
        SELECT *
        FROM maps
        WHERE user_id = $1;
        `, [userId])
      .then(mapsData => {
        const maps = mapsData.rows;
        res.send({ maps });
      }
      ).catch(e => res.send(e));
  });

  // draw all pins
  router.get("/pins", (req, res) => {
    return db
      .query(`
      SELECT *
      FROM pins;`)
      .then(pinobj => {
        const pins = pinobj.rows;
        res.send({ pins });
      })
      .catch(e => res.send(e));
  });

  return router;
};
