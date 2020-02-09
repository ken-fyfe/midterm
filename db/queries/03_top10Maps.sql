-- select the 10 most popular maps
Select maps.title, count(*) FILTER (WHERE map_user_likes.likes) as popular_maps
-- Note: following code is used to count the number of TRUEs 'count(*) FILTER (WHERE map_user_likes.likes)'
FROM maps
JOIN map_user_likes ON map_user_likes.map_id = maps.id
GROUP BY maps.id
ORDER BY popular_maps DESC;
