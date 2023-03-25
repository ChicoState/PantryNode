"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.transaction = exports.trans_items = exports.storage_type = exports.site = exports.shelf_contents = exports.shelf = exports.section = exports.person = exports.permissions = exports.item = exports.empl_info = exports.aisle = exports.address = void 0;
// import type { Sequelize } from "sequelize";
const { Sequelize } = require("sequelize");
const { address: _address } = require("./address");
exports.address = _address;
const { aisle: _aisle } = require("./aisle");
exports.aisle = _aisle;
const { empl_info: _empl_info } = require("./empl_info");
exports.empl_info = _empl_info;
const { item: _item } = require("./item");
exports.item = _item;
const { permissions: _permissions } = require("./permissions");
exports.permissions = _permissions;
const { person: _person } = require("./person");
exports.person = _person;
const { section: _section } = require("./section");
exports.section = _section;
const { shelf: _shelf } = require("./shelf");
exports.shelf = _shelf;
const { shelf_contents: _shelf_contents } = require("./shelf_contents");
exports.shelf_contents = _shelf_contents;
const { site: _site } = require("./site");
exports.site = _site;
const { storage_type: _storage_type } = require("./storage_type");
exports.storage_type = _storage_type;
const { trans_items: _trans_items } = require("./trans_items");
exports.trans_items = _trans_items;
const { transaction: _transaction } = require("./transaction");
exports.transaction = _transaction;
const { addressAttributes, addressCreationAttributes, } = require("./address");
const { aisleAttributes, aisleCreationAttributes } = require("./aisle");
const { empl_infoAttributes, empl_infoCreationAttributes, } = require("./empl_info");
const { itemAttributes, itemCreationAttributes } = require("./item");
const { permissionsAttributes, permissionsCreationAttributes, } = require("./permissions");
const { personAttributes, personCreationAttributes } = require("./person");
const { sectionAttributes, sectionCreationAttributes } = require("./section");
const { shelfAttributes, shelfCreationAttributes } = require("./shelf");
const { shelf_contentsAttributes, shelf_contentsCreationAttributes, } = require("./shelf_contents");
const { siteAttributes, siteCreationAttributes } = require("./site");
const { storage_typeAttributes, storage_typeCreationAttributes, } = require("./storage_type");
const { trans_itemsAttributes, trans_itemsCreationAttributes } = require("./trans_items");
const { transactionAttributes, transactionCreationAttributes, } = require("./transaction");
function initModels(sequelize) {
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
    person.belongsTo(address, { as: "pri_addr", foreignKey: "pri_addr_id" });
    address.hasMany(person, { as: "pri_addr_people", foreignKey: "pri_addr_id" });
    site.belongsTo(address, { as: "addr", foreignKey: "addr_id" });
    address.hasMany(site, { as: "sites", foreignKey: "addr_id" });
    section.belongsTo(aisle, { as: "aisle", foreignKey: "aisle_id" });
    aisle.hasMany(section, { as: "sections", foreignKey: "aisle_id" });
    empl_info.belongsTo(permissions, { as: "perm", foreignKey: "perm_id" });
    permissions.hasMany(empl_info, { as: "empl_infos", foreignKey: "perm_id" });
    address.belongsTo(person, { as: "person", foreignKey: "person_id" });
    person.hasMany(address, { as: "addresses", foreignKey: "person_id" });
    transaction.belongsTo(person, { as: "person", foreignKey: "person_id" });
    person.hasMany(transaction, { as: "transactions", foreignKey: "person_id" });
    shelf.belongsTo(section, { as: "section", foreignKey: "section_id" });
    section.hasMany(shelf, { as: "shelves", foreignKey: "section_id" });
    shelf_contents.belongsTo(shelf, { as: "shelf", foreignKey: "shelf_id" });
    shelf.hasMany(shelf_contents, { as: "shelf_contents", foreignKey: "shelf_id" });
    aisle.belongsTo(site, { as: "site", foreignKey: "site_id" });
    site.hasMany(aisle, { as: "aisles", foreignKey: "site_id" });
    transaction.belongsTo(site, { as: "site_site", foreignKey: "site" });
    site.hasMany(transaction, { as: "transactions", foreignKey: "site" });
    item.belongsTo(storage_type, { as: "stor", foreignKey: "stor_id" });
    storage_type.hasMany(item, { as: "items", foreignKey: "stor_id" });
    section.belongsTo(storage_type, { as: "stor", foreignKey: "stor_id" });
    storage_type.hasMany(section, { as: "sections", foreignKey: "stor_id" });
    shelf_contents.belongsTo(trans_items, { as: "trans_item", foreignKey: "trans_item_id" });
    trans_items.hasMany(shelf_contents, { as: "shelf_contents", foreignKey: "trans_item_id" });
    trans_items.belongsTo(transaction, { as: "tran", foreignKey: "trans_id" });
    transaction.hasMany(trans_items, { as: "trans_items", foreignKey: "trans_id" });
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
exports.initModels = initModels;
