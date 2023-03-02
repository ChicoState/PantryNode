CREATE TABLE Storage_type (
  stor_id serial,
  stor_type text UNIQUE NOT NULL,
  PRIMARY KEY (stor_id)
);

CREATE TABLE Site (
  site_id serial,
  addr_id int,
  name text NOT NULL,
  PRIMARY KEY (site_id)
);

CREATE TABLE Aisle (
  site_id int NOT NULL,
  aisle_id serial,
  info text,
  PRIMARY KEY (aisle_id),
  CONSTRAINT FK_Aisle_site_id
    FOREIGN KEY (site_id)
      REFERENCES Site(site_id)
);

CREATE TABLE Section (
  section_id serial,
  aisle_id int NOT NULL,
  stor_id int NOT NULL,
  PRIMARY KEY (section_id),
  CONSTRAINT FK_Section_aisle_id
    FOREIGN KEY (aisle_id)
      REFERENCES Aisle(aisle_id),
  CONSTRAINT FK_Section_stor_id
    FOREIGN KEY (stor_id)
      REFERENCES Storage_type(stor_id)
);

CREATE TABLE Shelf (
  shelf_id serial,
  section_id int NOT NULL,
  capacity int NOT NULL,
  PRIMARY KEY (shelf_id),
  CONSTRAINT FK_Shelf_section_id
    FOREIGN KEY (section_id)
      REFERENCES Section(section_id)
);
CREATE TYPE category AS ENUM ('produce', 'fruit', 'meat', 'dairy', 'baked goods', 'canned', 'snacks', 'beverage', 'condiments & spices', 'processed foods', 'other' );
CREATE TABLE Item (
  item_id serial,
  name text UNIQUE,
  category category,
  stor_id int NOT NULL,
  size int,
  PRIMARY KEY (item_id),
  CONSTRAINT FK_Item_stor_id
    FOREIGN KEY (stor_id)
      REFERENCES Storage_type(stor_id)
);

CREATE TABLE Person (
  person_id serial,
  fname text NOT NULL,
  lname text NOT NULL,
  password text NOT NULL,
  email text UNIQUE NOT NULL,
  phone int,
  pri_addr_id int,
  empl_id int,
  PRIMARY KEY (person_id)
);

CREATE TYPE trans_type AS ENUM ('donation', 'purchase', 'throw out' );
CREATE TABLE Transaction (
  trans_id serial,
  person_id int,
  date timestamptz NOT NULL,
  trans_type trans_type,
  site int NOT NULL,
  PRIMARY KEY (trans_id),
  CONSTRAINT FK_Transaction_site
    FOREIGN KEY (site)
      REFERENCES Site(site_id),
  CONSTRAINT FK_Transaction_person_id
    FOREIGN KEY (person_id)
      REFERENCES Person(person_id)
);

CREATE TABLE Trans_items (
  trans_id int NOT NULL,
  trans_item_id serial,
  item_id int NOT NULL,
  quantity int NOT NULL,
  expiration date,
  PRIMARY KEY (trans_item_id),
  CONSTRAINT FK_Trans_items_trans_id
    FOREIGN KEY (trans_id)
      REFERENCES Transaction(trans_id)
);

CREATE TABLE Shelf_contents (
  self_conts_id serial,
  trans_item_id int NOT NULL,
  shelf_id int NOT NULL,
  store_date timestamptz NOT NULL,
  quantity int NOT NULL,
  PRIMARY KEY (self_conts_id),
  CONSTRAINT FK_Shelf_contents_trans_item_id
    FOREIGN KEY (trans_item_id)
      REFERENCES Trans_items(trans_item_id),
  CONSTRAINT FK_Shelf_contents_shelf_id
    FOREIGN KEY (shelf_id)
      REFERENCES Shelf(shelf_id)
);

CREATE TABLE Address (
  person_id int,
  addr_id serial,
  addr_1 text NOT NULL,
  addr_2 text,
  city text NOT NULL,
  state text NOT NULL,
  zip int NOT NULL,
  country text NOT NULL,
  PRIMARY KEY (addr_id),
  CONSTRAINT FK_Address_person_id
    FOREIGN KEY (person_id)
      REFERENCES Person(person_id)
);

CREATE TABLE Permissions (
  perm_id serial,
  perm_num int,
  description text,
  PRIMARY KEY (perm_id)
);
CREATE TYPE role AS ENUM ('staff', 'manager', 'volunteer');
CREATE TABLE Empl_info (
  empl_id serial,
  perm_id int NOT NULL,
  role role,
  PRIMARY KEY (empl_id),
  CONSTRAINT FK_Permissions_perm_id
    FOREIGN KEY (perm_id)
      REFERENCES Permissions(perm_id)
);

ALTER TABLE Site ADD CONSTRAINT FK_Site_addr_id
  FOREIGN KEY (addr_id)
    REFERENCES Address(addr_id);

alter table Person ADD CONSTRAINT FK_Person_pri_addr
  FOREIGN KEY (pri_addr_id)
    REFERENCES Address(addr_id);