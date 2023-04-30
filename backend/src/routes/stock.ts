var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');

var { Sequelize } = require('sequelize');
var { initModels, stock } = require("../models/init-models");

const sequelize = new Sequelize(require('../config/keys').PostgresURI);

initModels(sequelize);

router.get('/stock', ensureAuthenticated, function (req: any, res: any) {
    if (!req.isAuthenticated()) {
        const errors = [];
        res.post('Unauthenticated');
    } else {
        stock.findAll().then((cur_stock: typeof stock[]) => {
            if (cur_stock == null) {
                console.log("THIS IS ERROR " + cur_stock);
            } else {
                res.json(JSON.stringify(cur_stock));
            }
        });
    }
});

module.exports = router;