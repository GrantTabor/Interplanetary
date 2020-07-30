create table planet (planet_id serial primary key, planet_name varchar(20), user_id int, FOREIGN KEY (user_id) REFERENCES planetaryUser(user_id));
