-- list specific map from a user
SELECT *
FROM maps
WHERE maps.user_id = 7 AND maps.id = 8
-- I don't think we need both user_id and maps.id for this!
