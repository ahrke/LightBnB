INSERT INTO users (name, email, password)
VALUES
  ('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Louisa Meyer','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Dominic Parks','victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sue Luna','jasonvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Rosalie Garza','jacksondavid@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Etta West','charlielevy@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Margaret Wong','makaylaweiss@icloud.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Leroy Hart','jaycereynolds@inbox.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
;

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES
  (1,'Speed Lamp','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',830,6,4,8,'Canada','536 Namsub Highway','Sotboske','Quebec','28142',true),
  (1,'Hanger Pains','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',1030,8,2,4,'Canada','2 Sperita Court','Willomdom','Ontario','O0O0O0',true),
  (2,'Aphrocamper','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',5630,6,2,10,'Canada','53 Damsels Dr','Severit','BC','58332',true),
  (3,'Funland','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',30,1,0,0,'Canada','666 Pit Blvd','Heill','Ontario','S6X6S6',true),
  (4,'Headed Know','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',430,2,2,3,'US','1 Here','Samsung','California','28992',true),
  (5,'Game Fill','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',44200,10,12,8,'Canada','20 Elementary Lane','Sherlocke','Nunavut','11142',true),
  (6,'Shine twenty','description','https://i.imgur.com/UDuoYpt.jpg','https://i.imgur.com/UDuoYpt.jpg',537,3,2,4,'Canada','45 Cemetary Round','Getout','Seriously','P0S7A1',true)
;

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11','2018-09-26',2,4),
  ('2019-01-04','2019-02-01',1,2),
  ('2021-10-01','2021-10-14',6,7),
  ('2014-10-21','2014-10-26',4,6),
  ('2016-07-11','2016-08-16',4,1),
  ('2019-03-04','2019-05-26',3,8),
  ('2017-08-11','2017-09-01',5,3)
;

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 5, 7, 3, 'message'),
  (1, 4, 1, 4, 'message'),
  (5, 2, 3, 5, 'message'),
  (3, 1, 2, 1, 'message'),
  (4, 3, 6, 2, 'message'),
  (6, 6, 5, 5, 'message')
;