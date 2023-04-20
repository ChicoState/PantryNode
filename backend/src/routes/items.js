var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

var { Sequelize, Op } = require('sequelize');
var { initModels, item, trans_items, transaction } = require("../models/init-models");

const sequelize = new Sequelize(require('../config/keys').PostgresURI);

initModels(sequelize);

router.get('/items', ensureAuthenticated, function (req, res) {
    console.log("Nothing here yet!");
    // TODO: Return list of items?
});

router.get('/items/expired', ensureAuthenticated, function (req, res) {
    // TODO(@parthpandey1): This returns ids, enrich the return with actual item data.
    const today = new Date();
    return trans_items.findAll({
        where: {
            expiration: {
                [Op.lte]: today
            }
        },
        include: [{
            model: transaction,
            as: 'tran',
            required: true,
            attributes: ['date']
        }, {
            model: item,
            as: 'item',
            required: true,
            attributes: ['name']
        }],
        attributes: ['trans_item_id', 'quantity', 'expiration'],
    }).then((allItems) => {
        if (allItems == null) {
            console.log("THIS IS ERROR " + allItems);
        } else {
            res.json(JSON.stringify(allItems));
        }
    });
});

module.exports = router;