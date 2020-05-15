var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
var passport = require('passport');
const Donor = require('../models/Donor');

const Item = require('../models/Item');
const Stock = require('../models/Stock');
const Category = require('../models/Category');
const Donation = require('../models/Donation');
const ExpiryItems = require('../models/ExpiryItems');

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

    const { itemName, itemType, quantity, dateExp, price, donorID } = req.body;



    const newStock = new Stock({
        quantity,
        itemType,
        dateExp,
        price
    });

    var stockID = newStock._id;

    const date1 = new Date(dateExp);
    const expTimeRemain = new Date(dateExp);

    expTimeRemain.setDate(date1.getDate() + 2);
    const newItem = new Item({
        itemName,
        itemType,
        stockID,
        dateExp,
        expTimeRemain
    });



    const newDonation = new Donation({
        donorID,
        stockID,
    });





    newStock.save();
    newItem.save();
    newDonation.save();


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


router.post('/checkout', ensureAuthenticated, function(req, res) {

    console.log("IN BASE...");
    let errors = [];

    const { itemId, quantityX, chicoId } = req.body;

    console.log("kkkk  => " + itemId);


    Item.findOne({ '_id': itemId })
        .then(item => {
            if (item) {
                console.log("stk ID=> " + item.stockID + " default date => " + new Date() + " exp date => " + item.dateExp);
                const diff = Math.abs(new Date() - new Date(item.dateExp));
                console.log("DIFF DATES => " + diff);
                if (diff >= 0) {
                    console.log("Expired Items....");
                    itemName = item.itemName;
                    itemType = item.itemType;
                    stockID = item.stockID;
                    dateExp = item.dateExp;

                    const expItems = new ExpiryItems({
                        itemName,
                        itemType,
                        stockID,
                        dateExp

                    });

                    expItems.save();

                    console.log("Item Table entry before removal : " + item._id);
                    Item.deleteOne({
                            'stockID': item.stockID
                        },
                        function(err, res) {
                            if (err) throw err;
                            console.log("1 Item deleted");

                        });

                    // Stock.deleteOne({
                    //         '_id': item.stockID
                    //     },
                    //     function(err, res) {
                    //         if (err) throw err;
                    //         console.log("1 Stock deleted");

                    //     });

                    //  Stock.remove({'_id': (item.stockID)});

                    Item.find({}, function(err, allItems) {
                        if (err) {
                            console.log("THIS IS ERRROR " + err);
                        } else {

                            errors.push({ msg: 'The item date for  ' + itemName + ' has expired. Select other item.' });
                            res.render('checkoutdetails', {
                                data: { name: req.user.name, items: allItems, errors }
                            })

                        }


                    })


                } else {
                    console.log("Active  Items....");
                    Stock.findOne({ _id: item.stockID })
                        .then(stk => {
                            if (stk) {


                                if (parseInt(stk.quantity) < parseInt(quantityX)) {
                                    console.log("Error!");
                                    console.log("CC: " + stk.quantity);
                                    console.log("Q: " + quantityX);


                                    errors.push({ msg: 'There are only ' + stk.quantity + ' in Pantry!' });

                                    Item.find({}, function(err, allItems) {
                                        if (err) {
                                            console.log("THIS IS ERRROR " + err);
                                        } else {

                                            res.render('checkoutdetails', {
                                                data: { name: "jayesh", items: allItems, errors }
                                            })

                                        }


                                    })

                                } else if (parseInt(stk.quantity) >= parseInt(quantityX)) {
                                    console.log("Case 2!");

                                    console.log(stk.quantity);
                                    console.log(quantityX);

                                    Stock.update({ _id: stk._id }, { quantity: parseInt(stk.quantity) - parseInt(quantityX) }, function(err, res) {
                                        if (err) throw err;
                                        console.log("1 document updated");
                                    });
                                    Item.find({}, function(err, allItems) {
                                            if (err) {
                                                console.log("THIS IS ERRROR " + err);
                                            } else {

                                                console.log(" ALL ITEMS => " + allItems);
                                                res.render('checkout_success', {
                                                    data: { name: "jayesh", items: allItems, errors }
                                                })

                                            }


                                        })
                                        //res.render('checkout_success', {data: {}});
                                } else {
                                    res.redirect('/checkout');

                                }




                            }

                        });;
                }


            }
        });;





});


router.get('/checkout', function(req, res) {
    // if (!req.isAuthenticated()) {
    //     let errors = [];
    //     res.redirect('index', { errors });
    // } else
    {


        Item.find({}, function(err, allItems) {
            if (err) {
                console.log("THIS IS ERRROR " + err);
            } else {

                // console.log(" forward to checkout");
                // console.log(allItems);

                res.render('checkoutdetails', {
                    data: { name: "jayesh", items: allItems }
                })
            }


            console.log("OUTSIDE");

        })

    }
});



router.get('/charts', ensureAuthenticated, function(req, res) {
    if (!req.isAuthenticated()) {
        let errors = [];
        res.redirect('index', { errors });
    } else {
        console.log("IN CHARTS ");
        Item.find({}, function(err, allItems) {
            if (err) {
                console.log("THIS IS ERRROR " + err);
            } else {
                dataList = []
                labels = []
                console.log("STOCK => " + allItems);
                /*for (var i = 0; i < allItems.length; i++) {
                  dataList.push(allItems[i]['quantity']);
                  labels.push(i + "abc");
                }*/
                //console.log("DATALIST=> " + dataList + " labels => " + labels);
                //  dataObj = {"labels": labels, "series": dataList };
                expItems = {}



                res.render('charts', {
                    data: { name: req.user.name, dataList: allItems }
                })
            }
        })
    }


});












module.exports = router;