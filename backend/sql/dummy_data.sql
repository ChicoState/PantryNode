-- Insert test data for Storage_type
INSERT INTO Storage_type (stor_type) VALUES
  ('Refrigerated'),
  ('Dry'),
  ('Frozen');

-- Insert test data for Person
-- Password for user is password
INSERT INTO Person (fname, lname, password, email, phone)
VALUES ('John', 'Doe', '$2a$10$p3igL0pzl1DyxOmMYu7qFOvnffCqn.X1xOkfeEEKOrFwJB5B9Kcsy', 'johndoe@example.com', 1234567890);

-- Insert test data for Address
INSERT INTO Address (person_id, addr_1, city, state, zip, country)
VALUES ((SELECT MAX(person_id) FROM Person), '123 Main St', 'Anytown', 'CA', 12345, 'USA');

UPDATE Person SET pri_addr_id = (SELECT MAX(addr_id) FROM Address)
WHERE email = 'johndoe@example.com';

-- Insert test data for Person
-- Password for user is password
INSERT INTO Person (fname, lname, password, email, phone)
VALUES ('Jane', 'Smith', '$2a$10$p3igL0pzl1DyxOmMYu7qFOvnffCqn.X1xOkfeEEKOrFwJB5B9Kcsy', 'janesmith@example.com', 1234567890);

-- Insert test data for Address
INSERT INTO Address (person_id, addr_1, city, state, zip, country)
VALUES ((SELECT MAX(person_id) FROM Person), '456 Main St', 'Anytown', 'CA', 12345, 'USA');

UPDATE Person SET pri_addr_id = (SELECT MAX(addr_id) FROM Address)
WHERE email = 'janesmith@example.com';

INSERT INTO Address (addr_1, city, state, zip, country)
VALUES ('111 Site St', 'FoodBank', 'CA', 12345, 'USA');
-- Insert test data for Site
INSERT INTO Site (addr_id, name)
VALUES ((SELECT MAX(addr_id) FROM Address), 'Test Site');

-- Insert test data for Aisle
INSERT INTO Aisle (site_id, info)
VALUES ((SELECT MAX(site_id) FROM Site), 'Produce Aisle');

-- Insert test data for Section
INSERT INTO Section (aisle_id, stor_id)
VALUES ((SELECT MAX(aisle_id) FROM Aisle), (SELECT MAX(stor_id) FROM Storage_type)),
       ((SELECT MAX(aisle_id) FROM Aisle), (SELECT MAX(stor_id) FROM Storage_type)-1);
