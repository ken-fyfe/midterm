-- select the 10 most popular pins
Select pins.title, count(*) FILTER (WHERE pin_user_likes.likes) as popular_pins
-- Note: following code is used to count the number of TRUEs 'count(*) FILTER (WHERE map_user_likes.likes)'
FROM pins
JOIN pin_user_likes ON pin_user_likes.pin_id = pins.id
GROUP BY pins.id
ORDER BY popular_pins DESC;
