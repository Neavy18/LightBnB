SELECT owner_id, title, description,
 thumbnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, avg(rating) as average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE city LIKE '%ancouver'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >=4
ORDER BY cost_per_night
LIMIT 10;