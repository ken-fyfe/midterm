-- find a user my username
SELECT *
FROM users
WHERE LOWER(users.email) = 'mannering@email.com'
