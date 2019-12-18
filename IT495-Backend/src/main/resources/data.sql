INSERT IGNORE INTO role (id, name) VALUES (1, 'ADMIN'),(2, 'USER');

INSERT IGNORE INTO user (id, email, first_name, is_active, is_verified, last_name, password, role_id) VALUES (1, 'admin@mailinator.com', 'Admin', 1, 1, 'Admin', '$2a$10$l9xkDM7mV6ktcc4XZNnurOfDCSm79.IcY/CK/r0/rYO/MdAEp5hDe', 1);

INSERT IGNORE INTO size (id, value) VALUES ('1', '30'),('2', '31'),('3', '32'),('4', '33'),('5', '34'),('6', '35'),('7', '36'),('8', '37'),('9', '38'),('10', '39'),('11', '40'),('12', '41'),('13', '42'),('14', '43'),('15', '44'),('16', '45'),('17', '46'),('18', '47'),('19', '48'),('20', '49'),('21', '50');
