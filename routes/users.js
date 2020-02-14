/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
// const database = require("../server/database.js");
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


        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });

  //check if a registered user exists by comparing password with hashed password
  const login = function(email, password) {
    return db
      .query(`
        SELECT *
        FROM users
        WHERE email = $1;`,
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
      .query(`
        SELECT *
        FROM users
        WHERE id = $1;`,
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
    if (!userId) {
    return db
      .query(`
        SELECT *
        FROM maps;`
      )
      .then(mapsData => {
        const maps = mapsData.rows;
        res.send({ maps });
      })
      .catch(e => res.send(e));
    }
    return db
      .query(`
        SELECT *
        FROM maps
        WHERE user_id = $1;`,
        [userId]
      )
      .then(mapsData => {
        const maps = mapsData.rows;
        res.send({ maps });
      })
      .catch(e => res.send(e)
    );
  });

  router.get("/favs", (req, res) => {
    const userId = req.session.userId;
    return db
      .query(`
      SELECT maps.*
      FROM map_user_likes JOIN maps ON maps.id = map_user_likes.map_id WHERE map_user_likes.user_id = $1;`,
      [userId]
    )
    .then(mapsData => {
      const maps = mapsData.rows;
      res.send({ maps });
    })
    .catch(e => res.send(e));
  });

  router.get("/collabs", (req, res) => {
    const userId = req.session.userId;
    console.log("inside collab maps", userId);
    return db
      .query(`
      SELECT maps.*
      FROM map_id_pin_ids
      JOIN maps ON maps.id = map_id_pin_ids.map_id
      JOIN pins ON pins.id = map_id_pin_ids.pin_id
      WHERE map.id NOT IN (SELECT id FROM maps WHERE user_id = $1)
      AND pin.id IN (SELECT id FROM pins WHERE user_id = $1);`,
      [userId]
    )
    .then(mapsData => {
      const maps = mapsData.rows;
      res.send({ maps });
    })
    .catch(e => res.send(e));
  });


  router.get("/allmaps", (req, res) => {
    const userId = req.session.userId;
      return db
        .query(`
          SELECT *
          FROM maps;`
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
      .query(`
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
    const mapId = req.session.mapId;
    const map = req.body;
    const mapValues = [
      map["name"],
      map["desciption"], mapId
    ];
    return db
      .query(`
        UPDATE maps
        SET title = $1, description = $2
        WHERE id = $3`,
        mapValues
      )
      .then(() => {
        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });

  router.post("/addMap", (req, res) => {
    const userId = req.session.userId;
    const mapObject = req.body;
    const lat = mapObject.lat
    const lng = mapObject.lng
    const zoomLevel = mapObject.zoomLevel;
    const mapValues = [userId, 'name', 'desc', mapObject["lat"], mapObject["lng"], mapObject["zoomLevel"]];
    return db
      .query(`
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
        req.session.mapId = createdMap.rows[0]['id'];
        res.send(":hugging_face:");
      })
      .catch(e => res.send(e));
  });

  router.post("/addUserLike", (req, res) => {
    const userId = req.session.userId;
    const mapObject = req.body;
      const mapValues = [userId, Number(mapObject.mapId), true];
      return db
        .query(`
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
  })


  router.post("/details", (req, res) => {
    const userId = req.session.userId;
    const mapObject = req.body;
    const mapRow = [userId, Number(mapObject.mapId)];
    return db
    .query(`
      SELECT count(*)
      FROM map_user_likes
      WHERE map_id = $2 AND user_id = $1;`,
      mapRow
    )
    .then(num => {
      const countNum = num.rows[0].count;
      res.send({countNum})
    }).catch(e => res.send(e))
  })

  router.post("/likes", (req, res) => {
    mapObject = req.body
    mapId =  Number(mapObject.mapId)
    userId = req.session.userId
    if (userId) {
      return db
        .query(`
          SELECT COUNT(*)
          FROM map_user_likes
          WHERE map_id = $1;`,
          [mapId]
        )
        .then(likesNumber => {
          const likes = likesNumber.rows[0];
          res.send({ likes });
        })
        .catch(e => res.send(e));
    } else {
      res.send('not logged in')
    }
  });

  router.post("/addPin", (req, res) => {
    pinObject =req.body;
    const userId = req.session.userId;
    const lat = pinObject.lat;
    const lng = pinObject.lng;
    return db
      .query(`
        INSERT INTO pins (
        user_id, title, latitude, longitude, description, category)
        VALUES($1, 'title', $2, $3, 'description', 'category')
        RETURNING id;`,
        [userId, lat, lng]
      )
      .then(newPin => {
        const newPinId = newPin.rows[0]['id'];
        req.session.pinId = newPinId;
        res.send('cookie added');
      })
      .catch(e => res.send(e));
  });

  router.post("/createPin", (req, res) => {
    pinObject = req.body;
    pinId = req.session.pinId;
    const lat = pinObject.lat;
    const lng = pinObject.lng;
    const pinTitle = pinObject.name;
    const pinDesc = pinObject.description;
    return db
      .query(`
        UPDATE pins
        SET title = $1, description = $2, category = $3
        WHERE id = $4 RETURNING *;`,
        [pinObject.name, pinObject.description, pinObject.category, pinId]
      )
      .then(newPin => {
        const newPinObj = newPin.rows[0];
        res.send({newPinObj});
      })
      .catch(e => res.send(e));
  });

  router.post("/addMapPin", (req, res) => {
    console.log('inside map Pins!');
    pinId =req.session.pinId;
    mapId = req.session.mapId;
    console.log(mapId, pinId);
    return db
      .query(`
        INSERT INTO map_id_pin_ids (map_id, pin_id)
        VALUES($1,$2)
        RETURNING *;`,
        [mapId, pinId]
      )
      .then((createdPin) => {
        console.log(createdPin, 'created a new pin');
        res.send('added map pin')
      })
      .catch(e => res.send(e));
  });

  router.post("/setMapId", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.body.mapId;
    req.session.mapId = mapId;
    res.send('cookied added')
  })
  return router;
};
