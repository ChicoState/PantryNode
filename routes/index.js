var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Donor = require('../models/Donor');
const Item = require('../models/Item');
const Stock = require('../models/Stock');
const Category = require('../models/Category');
const Donation = require('../models/Donation');
const ExpiryItems = require('../models/ExpiryItems');
const Checkout = require('../models/Checkout');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        let errors = [];
        res.render('index', { errors });
    } else {
        res.redirect('/home', { title: 'Home' });

    }

});

router.get('/home', ensureAuthenticated, function(req, res) {
    if (!req.isAuthenticated()) {
        let errors = [];
        res.redirect('index', { errors });
    } else {
        Item.find({}, function(err, allItems) {
            if (err) {
                console.log("THIS IS ERRROR " + err);
            } else {
                let ids = [];

                console.log("Check");
                // console.log(allItems);
                const oneDay = 24 * 60 * 60 * 1000;

                for (var i = 0; i < allItems.length; i++) {

                    const diff = Math.round(Math.abs((new Date() - new Date(allItems[i]['dateExp'])) / oneDay));
                    console.log("Days:" + diff);
                    if (diff <= 2) {
                        ids.push(allItems[i]);
                    }
                }

                console.log(ids);

                if (ids.length > 0) {
                    res.render('dashboard', {
                        data: { name: req.user.name, expItems: ids }
                    })
                } else {
                    res.render('dashboard', {
                        data: { name: req.user.name }
                    })
                }

            }
        });


    }

});




module.exports = router;