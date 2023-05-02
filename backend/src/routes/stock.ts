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
        console.log(req.query);
        if(req.query.item !== undefined) {
            const filter = ` word_similarity('${req.query.item}', name) > 0.5 ORDER BY name <->> '${req.query.item}'`;
            stock.findAll({
                where: Sequelize.literal(filter),
            }).then((cur_stock: typeof stock[]) => {
                if (cur_stock == null) {
                    res.send("No Items Found");
                } else {
                    res.json(cur_stock);
                }
            });
        } else {
            stock.findAll().then((cur_stock: typeof stock[]) => {
            if (cur_stock == null) {
                console.log("THIS IS ERROR " + cur_stock);
            } else {
                res.json(cur_stock);
            }
            });
        }
    }
});

module.exports = router;