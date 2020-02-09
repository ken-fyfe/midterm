-- list favourite maps of user
SELECT *
FROM map_user_likes
JOIN maps ON map_id = maps.id
JOIN users ON map_user_likes.user_id = users.id
WHERE users.id = 2 AND map_user_likes.likes = TRUE
