const { Sequelize } = require("sequelize");
const { address: _address } = require("./address");
const { aisle: _aisle } = require("./aisle");
const { empl_info: _empl_info } = require("./empl_info");
const { item: _item } = require("./item");
const { permissions: _permissions } = require("./permissions");
const { person: _person } = require("./person");
const { section: _section } = require("./section");
const { shelf: _shelf } = require("./shelf");
const { shelf_contents: _shelf_contents } = require("./shelf_contents");
const { site: _site } = require("./site");
const { stock: _stock } = require("./stock");
const { storage_type: _storage_type } = require("./storage_type");
const { trans_items: _trans_items } = require("./trans_items");
const { transaction: _transaction } = require("./transaction");


const {
  addressAttributes,
  addressCreationAttributes
} = require("./address");
const { aisleAttributes, aisleCreationAttributes } = require("./aisle");
const {
  empl_infoAttributes,
  empl_infoCreationAttributes,
} = require("./empl_info");
const { itemAttributes, itemCreationAttributes } = require("./item");
const {
  permissionsAttributes,
  permissionsCreationAttributes,
} = require("./permissions");
const { personAttributes, personCreationAttributes } = require("./person");
const { sectionAttributes, sectionCreationAttributes } = require("./section");
const { shelfAttributes, shelfCreationAttributes } = require("./shelf");
const {
  shelf_contentsAttributes,
  shelf_contentsCreationAttributes,
} = require("./shelf_contents");
const { siteAttributes, siteCreationAttributes } = require("./site");
const { stockAttributes, stockCreationAttributes } = require("./stock");
const {
  storage_typeAttributes,
  storage_typeCreationAttributes,
} = require("./storage_type");
const { trans_itemsAttributes, trans_itemsCreationAttributes } = require("./trans_items");
const {
  transactionAttributes,
  transactionCreationAttributes,
} = require("./transaction");

export {
  _address as address,
  _aisle as aisle,
  _empl_info as empl_info,
  _item as item,
  _permissions as permissions,
  _person as person,
  _section as section,
  _shelf as shelf,
  _shelf_contents as shelf_contents,
  _site as site,
  _stock as stock,
  _storage_type as storage_type,
  _trans_items as trans_items,
  _transaction as transaction,
};

export type {
  addressAttributes,
  addressCreationAttributes,
  aisleAttributes,
  aisleCreationAttributes,
  empl_infoAttributes,
  empl_infoCreationAttributes,
  itemAttributes,
  itemCreationAttributes,
  permissionsAttributes,
  permissionsCreationAttributes,
  personAttributes,
  personCreationAttributes,
  sectionAttributes,
  sectionCreationAttributes,
  shelfAttributes,
  shelfCreationAttributes,
  shelf_contentsAttributes,
  shelf_contentsCreationAttributes,
  siteAttributes,
  siteCreationAttributes,
  stockAttributes,
  stockCreationAttributes,
  storage_typeAttributes,
  storage_typeCreationAttributes,
  trans_itemsAttributes,
  trans_itemsCreationAttributes,
  transactionAttributes,
  transactionCreationAttributes,
};

export function initModels(sequelize: typeof Sequelize) {
  const address = _address.initModel(sequelize);
  const aisle = _aisle.initModel(sequelize);
  const empl_info = _empl_info.initModel(sequelize);
  const item = _item.initModel(sequelize);
  const permissions = _permissions.initModel(sequelize);
  const person = _person.initModel(sequelize);
  const section = _section.initModel(sequelize);
  const shelf = _shelf.initModel(sequelize);
  const shelf_contents = _shelf_contents.initModel(sequelize);
  const site = _site.initModel(sequelize);
  const stock = _stock.initModel(sequelize);
  const storage_type = _storage_type.initModel(sequelize);
  const trans_items = _trans_items.initModel(sequelize);
  const transaction = _transaction.initModel(sequelize);
  
  person.belongsTo(address, { as: "pri_addr", foreignKey: "pri_addr_id"});
  address.hasMany(person, { as: "pri_addr_people", foreignKey: "pri_addr_id"});
  site.belongsTo(address, { as: "addr", foreignKey: "addr_id"});
  address.hasMany(site, { as: "sites", foreignKey: "addr_id"});
  section.belongsTo(aisle, { as: "aisle", foreignKey: "aisle_id"});
  aisle.hasMany(section, { as: "sections", foreignKey: "aisle_id"});
  empl_info.belongsTo(permissions, { as: "perm", foreignKey: "perm_id"});
  permissions.hasMany(empl_info, { as: "empl_infos", foreignKey: "perm_id"});
  address.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(address, { as: "addresses", foreignKey: "person_id"});
  transaction.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(transaction, { as: "transactions", foreignKey: "person_id"});
  shelf.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(shelf, { as: "shelves", foreignKey: "section_id"});
  shelf_contents.belongsTo(shelf, { as: "shelf", foreignKey: "shelf_id"});
  shelf.hasMany(shelf_contents, { as: "shelf_contents", foreignKey: "shelf_id"});
  aisle.belongsTo(site, { as: "site", foreignKey: "site_id"});
  site.hasMany(aisle, { as: "aisles", foreignKey: "site_id"});
  transaction.belongsTo(site, { as: "site_site", foreignKey: "site"});
  site.hasMany(transaction, { as: "transactions", foreignKey: "site"});
  item.belongsTo(storage_type, { as: "stor", foreignKey: "stor_id"});
  storage_type.hasMany(item, { as: "items", foreignKey: "stor_id"});
  section.belongsTo(storage_type, { as: "stor", foreignKey: "stor_id"});
  storage_type.hasMany(section, { as: "sections", foreignKey: "stor_id"});
  shelf_contents.belongsTo(trans_items, { as: "trans_item", foreignKey: "trans_item_id"});
  trans_items.hasMany(shelf_contents, { as: "shelf_contents", foreignKey: "trans_item_id"});
  trans_items.belongsTo(transaction, { as: "tran", foreignKey: "trans_id"});
  trans_items.belongsTo(item, { as: "item", foreignKey: "item_id" });
  transaction.hasMany(trans_items, { as: "trans_items", foreignKey: "trans_id"});

  return {
    address: address,
    aisle: aisle,
    empl_info: empl_info,
    item: item,
    permissions: permissions,
    person: person,
    section: section,
    shelf: shelf,
    shelf_contents: shelf_contents,
    site: site,
    stock: stock,
    storage_type: storage_type,
    trans_items: trans_items,
    transaction: transaction,
  };
}
