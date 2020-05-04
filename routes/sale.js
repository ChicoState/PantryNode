var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
var passport = require('passport');
const Donor = require('../models/Donor');

const Item = require('../models/Item');
const Stock = require('../models/Stock');
const Category = require('../models/Category');


const mongoose = require('mongoose');
var db = require('../config/keys').MongoURI;

const { ensureAuthenticated } = require('../config/auth');


mongoose.connect(db, { useNewUrlParser: true });



router.get('/sale', ensureAuthenticated, function(req, res) {
    if (!req.isAuthenticated()) {
        let errors = [];
        res.redirect('index', { errors });
    } else {
        res.render('sale', {
            name: req.user.name
        })
    }

});


router.post('/add_donor', function(req, res) {
    const { name, email, location, type, phone } = req.body;

    Donor.findOne({ email: email })
        .then(user => {
            if (user) {
                res.redirect('/donor?error=User Exists!');

                // return res.redirect('register', { errors });
            } else {
                const newUser = new Donor({
                    name,
                    email,
                    location,
                    type,
                    phone

                });
                console.log(newUser);
                newUser.save();

                console.log(newUser);
                res.redirect('/donor');
            }

        });;
});


router.get('/donor', ensureAuthenticated, function(req, res) {
    if (!req.isAuthenticated()) {
        let errors = [];
        res.redirect('index', { errors });
    } else {
        let errors = [];
        if (Object.keys(req.query).length !== 0) {
            errors.push({ msg: req.query.error });
        }

        Donor.find({}, function(err, allDonors) {
            if (err) {
                console.log(err);
            } else {

                if (errors.length > 0) {
                    res.render('donor', {
                        data: { name: req.user.name, donors: allDonors, errors }
                    })
                } else {
                    res.render('donor', {
                        data: { name: req.user.name, donors: allDonors }
                    })
                }

            }
        })


    }

});

router.get('/stock', ensureAuthenticated, function(req, res) {
    if (!req.isAuthenticated()) {
        let errors = [];
        res.redirect('index', { errors });
    } else {

        var donor;
        if (Object.keys(req.query).length !== 0) {
            donor = req.query.id;
        }
        console.log(donor);
        Category.find({}, function(err, allCategories) {
            if (err) {
                console.log(err);
            } else {


                res.render('stock', {
                    data: { name: req.user.name, categories: allCategories, donorId: donor }
                })




            }
        })



    }

});



router.post('/add_stock', function(req, res) {

    const { itemName, itemType, quantity, dateExp, price } = req.body;



    const newStock = new Stock({
        quantity,
        itemType,
        dateExp,
        price
    });

    var stockID = newStock._id;


    const newItem = new Item({
        itemName,
        itemType,
        stockID,
        dateExp
    });

    newStock.save();
    newItem.save();

    // console.log(newStock);
    // console.log(newItem);

    res.redirect('/stock');



});

router.post('/add_cat', function(req, res) {

    const { categoryName } = req.body;



    const newCat = new Category({
        categoryName
    });



    newCat.save();

    // console.log(newStock);
    // console.log(newItem);

    res.redirect('/stock');



});




module.exports = router;