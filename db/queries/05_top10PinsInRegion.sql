-- select the 10 most popular pins in a region
Select pins.title, count(*) FILTER (WHERE pin_user_likes.likes) as popular_pins
-- Note: following code is used to count the number of TRUEs 'count(*) FILTER (WHERE map_user_likes.likes)'
FROM pins
JOIN pin_user_likes ON pin_user_likes.pin_id = pins.id
WHERE pins.latitude > $latitude_min AND pins.latitude < $latitude_max AND
      pins.longitude > $longitude_min AND pins.longitude < $longitude_max
GROUP BY pins.id
ORDER BY popular_pins DESC;
