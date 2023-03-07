import type { Sequelize } from "sequelize";
import { address as _address } from "./address";
import type { addressAttributes, addressCreationAttributes } from "./address";
import { aisle as _aisle } from "./aisle";
import type { aisleAttributes, aisleCreationAttributes } from "./aisle";
import { empl_info as _empl_info } from "./empl_info";
import type { empl_infoAttributes, empl_infoCreationAttributes } from "./empl_info";
import { item as _item } from "./item";
import type { itemAttributes, itemCreationAttributes } from "./item";
import { permissions as _permissions } from "./permissions";
import type { permissionsAttributes, permissionsCreationAttributes } from "./permissions";
import { person as _person } from "./person";
import type { personAttributes, personCreationAttributes } from "./person";
import { section as _section } from "./section";
import type { sectionAttributes, sectionCreationAttributes } from "./section";
import { shelf as _shelf } from "./shelf";
import type { shelfAttributes, shelfCreationAttributes } from "./shelf";
import { shelf_contents as _shelf_contents } from "./shelf_contents";
import type { shelf_contentsAttributes, shelf_contentsCreationAttributes } from "./shelf_contents";
import { site as _site } from "./site";
import type { siteAttributes, siteCreationAttributes } from "./site";
import { storage_type as _storage_type } from "./storage_type";
import type { storage_typeAttributes, storage_typeCreationAttributes } from "./storage_type";
import { trans_items as _trans_items } from "./trans_items";
import type { trans_itemsAttributes, trans_itemsCreationAttributes } from "./trans_items";
import { transaction as _transaction } from "./transaction";
import type { transactionAttributes, transactionCreationAttributes } from "./transaction";

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
  storage_typeAttributes,
  storage_typeCreationAttributes,
  trans_itemsAttributes,
  trans_itemsCreationAttributes,
  transactionAttributes,
  transactionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
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
    storage_type: storage_type,
    trans_items: trans_items,
    transaction: transaction,
  };
}
