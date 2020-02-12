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
      .query(
        `
        INSERT INTO users (
        username, email, password)
        VALUES (
        $1, $2, $3)
        RETURNING *;`,
        userValues
      )
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

        console.log(req.session.userId, "cookie");
        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });

  //check if a registered user exists by comparing password with hashed password
  const login = function(email, password) {
    return db
      .query(
        `
          SELECT *
          FROM users
          WHERE email = $1;
          `,
        [email]
      )
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
      });
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
      .query(
        `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
        [userId]
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
        const user = userobj;
        res.send({ user });
      })
      .catch(e => res.send(e));
  });

  router.get("/maps", (req, res) => {
    const userId = req.session.userId;
    console.log("inside maps", userId);
    if (!userId) {
      return db
        .query(
          `
          SELECT *
          FROM maps;
          `
        )
        .then(mapsData => {
          const maps = mapsData.rows;
          res.send({ maps });
        })
        .catch(e => res.send(e));
    }
    return db
      .query(
        `
        SELECT *
        FROM maps
        WHERE user_id = $1;
        `,
        [userId]
      )
      .then(mapsData => {
        const maps = mapsData.rows;
        res.send({ maps });
      })
      .catch(e => res.send(e));
  });

  // select pins from database
  router.get("/pins", (req, res) => {
    return db
      .query(
        `
        SELECT *
        FROM pins;`
      )
      .then(pinobj => {
        const pins = pinobj.rows;
        res.send({ pins });
      })
      .catch(e => res.send(e));
  });
  router.post("/createMap", (req, res) => {
    const userId = req.session.userId;
    const map = req.body;
    // const mapValues = [userId, map["name"], map["desciption"], map["lat"], map["long"], map["zoom"]];
    const mapValues = [
      userId,
      map["name"],
      map["desciption"],
      40.737,
      -73.923,
      8
    ];

    return db
      .query(
        `
        INSERT INTO maps (
          user_id, title, description, latitude, longitude, zoom_level)
        VALUES (
        $1, $2, $3, $4, $5, $6)
        RETURNING *;`,
        mapValues
      )
      .then(createdMap => {
        if (!createdMap) {
          res.send({ error: "error" });
          return;
        }

        console.log(req.session.userId, "cookie");
        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });

  router.post("/details", (req, res) => {
    const userId = req.session.userId;
    const mapObject = req.body;
    console.log("maoObject", mapObject);
    const mapValues = [userId, mapObject.mapId, true];
    console.log(mapValues)

    return db
      .query(
        `
        INSERT INTO map_user_likes (user_id, map_id, likes)
        VALUES (
        $1, $2, $3)
        RETURNING *;`,
        mapValues
      )
      .then(createdMap => {
        if (!createdMap) {
          res.send({ error: "error" });
          return;
        }

        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });
  router.post("/likes", (req, res) => {
    console.log("inside likes")
    mapObject =req.body;
    mapId =mapObject.mapId
    console.log(req.body)
    return db
      .query(
        `
      SELECT COUNT(*) FROM map_user_likes WHERE map_id = $1 AND likes IS TRUE

      `,[mapId])
      .then(likesNumber => {
        const likes = likesNumber.rows[0];
        console.log(likes, "likes")
        res.send({ likes });
      })
      .catch(e => res.send(e));
  });

  router.post("/addPin", (req, res) => {
    console.log("inside pin")
    pinObject =req.body;
    const userId = req.session.userId;
    const lat = pinObject.lat
    const lng = pinObject.lng
    console.log(lat, lng)
    return db
      .query(
        `
        INSERT INTO pins (
          user_id, title, latitude, longitude, description, category)
         VALUES($1, 'title', $2, $3, 'description', 'category')
        RETURNING id;


      `,[userId, lat, lng]).then(newPin => {
        console.log(newPin.rows, "newPin")
      })
      .catch(e => res.send(e));

      
  });
  // router.post("/addMapPin", (req, res) => {
  //   console.log("inside pin")
  //   pinObject =req.body;
  //   mapId = req.session.mapId
  //   if(!mapId) {mapId="-1"}
  //   console.log(req.body)
  //   return db
  //     .query(
  //       `
  //       INSERT INTO map_id_pin_ids (map_id, pin_id)
  //       VALUES($1,$2)
  //       RETURNING *;


  //     `,[pinObject, mapId])
      
      
  // });

  router.post("/addMapId", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.body.mapId;
    console.log(mapId, "mapId")
    req.session.mapId = mapId
    console.log(req.session.mapId)
  })
  return router;
};
