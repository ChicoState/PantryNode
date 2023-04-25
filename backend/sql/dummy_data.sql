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

-- Insert test data for Shelf
INSERT INTO Shelf (section_id, capacity)
VALUES ((SELECT MAX(section_id) FROM Section), 100),
       ((SELECT MAX(section_id) FROM Section), 50),
       ((SELECT MAX(section_id) FROM Section)-1, 75),
       ((SELECT MAX(section_id) FROM Section)-1, 150);

-- Insert test data for Aisle
INSERT INTO Aisle (site_id, info)
VALUES ((SELECT MAX(site_id) FROM Site), 'Dairy Aisle');

-- Insert test data for Section
INSERT INTO Section (aisle_id, stor_id)
VALUES ((SELECT MAX(aisle_id) FROM Aisle), (SELECT MAX(stor_id) FROM Storage_type)-2),
       ((SELECT MAX(aisle_id) FROM Aisle), (SELECT MAX(stor_id) FROM Storage_type)-2);

-- Insert test data for Shelf
INSERT INTO Shelf (section_id, capacity)
VALUES ((SELECT MAX(section_id) FROM Section), 100),
       ((SELECT MAX(section_id) FROM Section), 50),
       ((SELECT MAX(section_id) FROM Section)-1, 75),
       ((SELECT MAX(section_id) FROM Section)-1, 150);

-- Insert test data for Item
INSERT INTO Item (item_id, name, category, stor_id, size, barcode)
VALUES (1, 'Apples', 'produce', (SELECT MAX(stor_id) FROM Storage_type)-1, 10, '123456789'),
       (2, 'Oranges', 'produce', (SELECT MAX(stor_id) FROM Storage_type), 15,'223456789'),
       (3, 'Milk', 'dairy', (SELECT MAX(stor_id) FROM Storage_type)-2, 1, '323456789'),
       (4, 'Cheese', 'dairy', (SELECT MAX(stor_id) FROM Storage_type)-2, 0.5, '423456789');

-- Insert test data for Permissions
INSERT INTO Permissions (perm_num, description)
VALUES (1, 'Can view inventory'),
       (2, 'Can edit inventory');

-- Insert test data for Empl_info
INSERT INTO Empl_info (perm_id, role)
VALUES ((SELECT MAX(perm_id) FROM Permissions), 'volunteer');

UPDATE Person SET empl_id = (SELECT MAX(empl_id) FROM Empl_info)
WHERE email = 'johndoe@example.com';

-- Insert test data for Transaction
INSERT INTO Transaction (person_id, date, trans_type, site)
VALUES ((SELECT MAX(person_id) FROM Person), NOW(), 'donation', 1),
       -- Add old transaction with goods that have been expiring.
       ((SELECT MIN(person_id) FROM Person), NOW() - INTERVAL '3 weeks', 'donation', 1);

-- Insert test data for Trans_items
INSERT INTO Trans_items (trans_id, item_id, quantity, expiration)
VALUES ((SELECT MIN(trans_id) FROM Transaction), 4, 5, NOW() + INTERVAL '1 week'),
       ((SELECT MIN(trans_id) FROM Transaction), 3, 10, NOW() + INTERVAL '2 weeks'),
       -- Donate goods that expired 3 weeks ago, 1 week ago, and 1 week from now.
       -- Old apples
       ((SELECT MAX(trans_id) FROM Transaction), 1, 7, NOW() - INTERVAL '3 weeks'),
       -- Old oranges
       ((SELECT MAX(trans_id) FROM Transaction), 2, 7, NOW() - INTERVAL '1 week'),
       -- Nearly old Milk
       ((SELECT MAX(trans_id) FROM Transaction), 3, 7, NOW() + INTERVAL '1 day');

-- Insert test data for Shelf_contents
INSERT INTO Shelf_contents (trans_item_id, shelf_id, store_date, quantity)
VALUES ((SELECT MAX(trans_item_id) FROM Trans_items), (SELECT MAX(shelf_id) FROM Shelf), NOW(), 5),
       ((SELECT MAX(trans_item_id) FROM Trans_items), (SELECT MAX(shelf_id) FROM Shelf), NOW(), 10);

REFRESH MATERIALIZED VIEW stock;