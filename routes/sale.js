var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
var passport = require('passport');
const Donor = require('../models/Donor');
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
        res.render('stock', {
            name: req.user.name
        })
    }

});



router.post('/add_stock', function(req, res) {
    // const { name, email, location, type, phone } = req.body;

    // Donor.findOne({ email: email })
    //     .then(user => {
    //         if (user) {
    //             res.redirect('/donor?error=User Exists!');

    //             // return res.redirect('register', { errors });
    //         } else {
    //             const newUser = new Donor({
    //                 name,
    //                 email,
    //                 location,
    //                 type,
    //                 phone
    //             });

    //             newUser.save();

    //             console.log(newUser);
    //             res.redirect('/donor');
    //         }

    //     });;

    console.log("Received");

    if (!req.isAuthenticated()) {
        let errors = [];
        res.redirect('index', { errors });
    } else {
        res.render('stock', {
            name: req.user.name
        })
    }


});




module.exports = router;