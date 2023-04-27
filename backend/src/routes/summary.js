var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

var { Sequelize, Op } = require('sequelize');
var { initModels, item, trans_items, transaction } = require("../models/init-models");

const sequelize = new Sequelize(require('../config/keys').PostgresURI);

initModels(sequelize);

router.get('/purchases', ensureAuthenticated, function (req, res) {
    if (!req.isAuthenticated()) {
        const errors = [];
        res.post('Unauthenticated');
    } else {
        
        trans_items.findAll({
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
            attributes: ['trans_item_id', 'item.name','item.category','quantity','tran.date'],
        }).then(transItems => {
            const result = transItems.map(transItem => {
            return {
                trans_item_id: transItem.trans_item_id,
                name: transItem.item.name,
                type: transItem.item.category,
                quantity: transItem.quantity,
                date: transItem.tran.date
            };
            });
            if (result == null) {
                console.log("THIS IS ERROR " + result);
            } else {
                res.json(JSON.stringify(result));
            }
        });
    }
});

router.get('/currentstock', ensureAuthenticated, function (req, res) {
    if (!req.isAuthenticated()) {
        const errors = [];
        res.post('Unauthenticated');
    } else {
        
        trans_items.findAll({
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
            attributes: ['trans_item_id', 'item.name','item.category','tran.date','expiration'],
        }).then(transItems => {
            const result = transItems.map(transItem => {
            return {
                trans_item_id: transItem.trans_item_id,
                name: transItem.item.name,
                type: transItem.item.category,
                stocked_date: transItem.tran.date,
                expiry_date: transItem.expiration
            };
            });
            if (result == null) {
                console.log("THIS IS ERROR " + result);
            } else {
                res.json(JSON.stringify(result));
            }
        });
    }
});

router.get('/wastemanagement', ensureAuthenticated, function (req, res) {
    if (!req.isAuthenticated()) {
        const errors = [];
        res.post('Unauthenticated');
    } else {        
        const currentDate = new Date();

        trans_items.findAll({
          where: {
            expiration: {
              [Op.lt]: currentDate
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
        attributes: ['trans_item_id','quantity','item.name','expiration'
        ],}).then(transItems => {
            const now = new Date();
            const result = transItems.map(transItem => {
            return {
                trans_item_id: transItem.trans_item_id,
                name: transItem.item.name,
                quantity: transItem.quantity,
                expiration: transItem.expiration
            };
            });
            if (result == null) {
                console.log("THIS IS ERROR " + result);
            } else {
                res.json(JSON.stringify(result));
            }
        });
    }
});

router.get('/soontoexpire', ensureAuthenticated, function (req, res) {
    if (!req.isAuthenticated()) {
        const errors = [];
        res.post('Unauthenticated');
      }  else {        
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
  
        trans_items.findAll({
            // where: {
            //     expiration: {
            //         [Op.lte]: twoDaysFromNow
            //     }
            // },
            include: [{
                model: item,
                as: 'item',
                required: true,
                attributes: ['name']
            }],
            attributes: ['trans_item_id', 'expiration','item.name'],
        }).then(transItems => {
            const now = new Date();
            const result = transItems.map(transItem => {
            const expirationDiff = Math.ceil((new Date(transItem.expiration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            return {
                trans_item_id: transItem.trans_item_id,
                Name: transItem.item.name,
                No_of_days_remaining: expirationDiff,
                expiration: transItem.expiration
            };
            });
            if (result == null) {
                console.log("THIS IS ERROR " + result);
            } else {
                res.json(JSON.stringify(result));
            }
        });
    }
  });
  
module.exports = router;
