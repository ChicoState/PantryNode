var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

var { Sequelize, Op } = require('sequelize');
var { initModels, item, trans_items, transaction } = require("../models/init-models");

const sequelize = new Sequelize(require('../config/keys').PostgresURI);

initModels(sequelize);

router.get('/items/expired', ensureAuthenticated, function (req, res) {
    const today = new Date();

    if (!req.isAuthenticated()) {
        res.post("Unauthenticated");
    } else {
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
                console.log("There are no items to return");
                res.json(JSON.stringify([]));
            } else {
                res.json(JSON.stringify(allItems));
            }
        }).catch(() => {
            console.log("There was an error retrieving nearly-expired items");
            res.status(400);
            res.send();
        });
    }
});

router.get('/items/nearly_expired', ensureAuthenticated, function (req, res) {
    const today = new Date();
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setTime(today.getTime() + (1000 * 60 * 60 * 24 * 2));

    if (!req.isAuthenticated()) {
        res.post("Unauthenticated");
    } else {
        return trans_items.findAll({
            where: {
                expiration: {
                    [Op.lte]: twoDaysFromNow,
                    [Op.gte]: today,
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
                console.log("There are no items to return");
                res.json(JSON.stringify([]));
            } else {
                res.json(JSON.stringify(allItems));
            }
        }).catch(() => {
            console.log("There was an error retrieving nearly-expired items");
            res.status(400);
            res.send();
        });
    }
});

router.get('/items/total_donations', ensureAuthenticated, function (req, res) {

    if (!req.isAuthenticated()) {
        res.post("Unauthenticated");
    } else {
        return trans_items.findAll({
            include: [{
                model: transaction,
                as: 'tran',
                required: true,
                where: {
                    trans_type: 'donation'
                }
            }],
        }).then((allItems) => {
            if (allItems == null) {
                console.log("There are no donated items to return");
                res.json(JSON.stringify([]));
            } else {
                res.json(allItems);
            }
        }).catch(() => {
            console.log("There was an error retrieving total donations");
            res.status(400);
            res.send();
        });
    }
});

router.get('/items/total_checkouts', ensureAuthenticated, function (req, res) {

    if (!req.isAuthenticated()) {
        res.post("Unauthenticated");
    } else {
        return trans_items.findAll({
            include: [{
                model: transaction,
                as: 'tran',
                required: true,
                where: {
                    trans_type: 'purchase'
                }
            }],
        }).then((allItems) => {
            if (allItems == null) {
                console.log("There are no checked-out items to return");
                res.json(JSON.stringify([]));
            } else {
                res.json(allItems);
            }
        }).catch(() => {
            console.log("There was an error retrieving total checkouts");
            res.status(400);
            res.send();
        });
    }
});

router.get('/items/unique_checkouts', ensureAuthenticated, function (req, res) {

    if (!req.isAuthenticated()) {
        res.post("Unauthenticated");
    } else {
        return transaction.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('person_id')) ,'person_id']],
            distinct: true,
            col: 'person_id',
            where: {
                trans_type: 'purchase'
            }
        }).then((allItems) => {
            if (allItems == null) {
                console.log("There are no student check-outs to return");
                res.json(JSON.stringify([]));
            } else {
                res.json(allItems);
            }
        }).catch(() => {
            console.log("There was an error retrieving unique student checkouts");
            res.status(400);
            res.send();
        });
    }
});

module.exports = router;