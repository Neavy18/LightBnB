INSERT INTO users (name, email, password)
VALUES('Victor Hugo', 'vic.hugo@lesmis.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Milan Kundera', 'millie.kun@unbearable.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bram Stoker', 'bram.stok@dracula.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mary Shelley', 'mary.shelley@frankenstein.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO  properties(owner_id, title, description,
 thumbnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES(1,'French Revolution Era Townhouse', 'description', 'https://thumbnail', 'https://cover', 550, 0, 2 , 4, 'Bailiwick of Guernsey', 'rue Hauteville', 'Guernsey', 'St. Peter Port', 'Y1 1DG'),
(2,'Cozy apartment', 'description', 'https://thumbnail', 'https://cover', 175, 1, 1, 1, 'Czechoslovakia', 'Purkyně ', 'Brno', 'Královo Pole', '738 01'),
(3,'Haunted manor', 'description', 'https://thumbnail', 'https://cover', 950, 50, 35 , 74, 'Romania', 'Str. G-ral Traian Mosoiu', 'Bran','Transylvania ', '507025');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES('2000-02-14', '2000-02-29', 1, 2),
('1848-09-15', '1848-10-31', 2, 1),
('1816-06-21', '1816-09-22', 3 ,4);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)  
VALUES(2,1,1,7,'message'),
(1,2,2,6,'message'),
(4,3,3,10,'message');


