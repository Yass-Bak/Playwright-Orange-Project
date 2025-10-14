USE sakila;

-- 1. Country
INSERT INTO country (country) VALUES 
('USA'), ('France'), ('Tunisia');

-- 2. City
INSERT INTO city (city, country_id) VALUES 
('New York', 1), ('Paris', 2), ('Sfax', 3);

-- 3. Address
INSERT INTO address (address, district, city_id, postal_code, phone)
VALUES
('123 Main St', 'NY', 1, '10001', '111-111-1111'),
('45 Rue Lafayette', 'Île-de-France', 2, '75009', '222-222-2222'),
('Ave Habib Bourguiba', 'Sfax', 3, '3000', '333-333-3333');

-- 4. Language
INSERT INTO language (name) VALUES ('English'), ('French'), ('Arabic');

-- 5. Category
INSERT INTO category (name) VALUES ('Action'), ('Comedy'), ('Drama');

-- 6. Actor
INSERT INTO actor (first_name, last_name)
VALUES ('Tom', 'Hanks'), ('Emma', 'Watson'), ('Brad', 'Pitt');

-- 7. Film
INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating)
VALUES
('Forrest Gump', 'Life story of a simple man', 1994, 1, 5, 4.99, 142, 19.99, 'PG-13'),
('Inception', 'Dreams within dreams', 2010, 1, 5, 4.99, 148, 19.99, 'PG-13'),
('Amélie', 'Parisian girl helps others', 2001, 2, 5, 3.99, 122, 17.99, 'G');

-- 8. Film-Actor relation
INSERT INTO film_actor (actor_id, film_id)
VALUES (1,1), (2,3), (3,2);

-- 9. Film-Category relation
INSERT INTO film_category (film_id, category_id)
VALUES (1,3), (2,1), (3,2);

-- 10. Staff
INSERT INTO staff (first_name, last_name, address_id, email, store_id, username)
VALUES ('John', 'Doe', 1, 'john.doe@example.com', 1, 'jdoe');

-- 11. Store
INSERT INTO store (manager_staff_id, address_id)
VALUES (1,1);

-- 12. Customer
INSERT INTO customer (store_id, first_name, last_name, email, address_id, create_date)
VALUES
(1, 'Alice', 'Smith', 'alice@example.com', 2, NOW()),
(1, 'Bob', 'Martin', 'bob@example.com', 3, NOW());

-- 13. Inventory
INSERT INTO inventory (film_id, store_id)
VALUES (1,1), (2,1), (3,1);

-- 14. Rental
INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id)
VALUES (NOW(), 1, 1, 1), (NOW(), 2, 2, 1);

-- 15. Payment
INSERT INTO payment (customer_id, staff_id, rental_id, amount, payment_date)
VALUES (1, 1, 1, 5.99, NOW()), (2, 1, 2, 3.99, NOW());
