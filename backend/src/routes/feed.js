var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

var { Sequelize, Op } = require('sequelize');
var { initModels, item, trans_items, transaction } = require("../models/init-models");

const sequelize = new Sequelize(require('../config/keys').PostgresURI);

initModels(sequelize);

router.get('/feed', ensureAuthenticated, function (req, res) {
    // add ! back in the if statement
    if (req.isAuthenticated()) {
        const errors = [];
        res.post('Unauthenticated');
    } else {
        var date_expired = new Date();
        if (req.body.exp) {
            const parsed = parseInt(req.body.exp);
            if (isNaN(parsed)) { 
                date_expired.setDate(date_expired.getDate() + 14);
            }
            date_expired.setDate(date_expired.getDate() + parsed);
        }
        else {
            date_expired.setDate(date_expired.getDate() + 14);
        }
        
        trans_items.findAll({
            where: {
                expiration: {
                    [Op.lte]: date_expired
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
                res.json(allItems); 
                
            }
        });
    }
});

module.exports = router;