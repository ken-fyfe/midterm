-- list the URLs of the pics associated with a pin
SELECT url
FROM pins
JOIN picture_urls ON pins.id = picture_urls.pin_id
