var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
var passport = require('passport');
const Donor = require('../models/Donor');

const Item = require('../models/Item');
const Stock = require('../models/Stock');
const Category = require('../models/Category');
const Donation = require('../models/Donation');

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


    const newItem = new Item({
        itemName,
        itemType,
        stockID,
        dateExp
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


router.post('/checkout', function(req, res) {


    let errors = [];

    const { itemId, quantityX, chicoId } = req.body;

    console.log(itemId);


    Item.findOne({ '_id': itemId })
        .then(item => {
            if (item) {
                console.log(item.stockID);


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
                                            data: { name: 'Subhed', items: allItems, errors }
                                        })

                                    }


                                })

                            } else if (parseInt(stk.quantity) >= parseInt(quantityX)) {
                                console.log("Case 2!");

                                console.log(stk.quantity);
                                console.log(quantityX);

                                Stock.update({ _id: stk._id }, { quantity: stk.quantity - quantityX }, function(err, res) {
                                    if (err) throw err;
                                    console.log("1 document updated");
                                });

                                res.redirect('/checkout_success');
                            } else {
                                res.redirect('/checkout');

                            }




                        }

                    });;

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
                    data: { name: 'Subhed', items: allItems }
                })
            }


            console.log("OUTSIDE");

        })

    }
});



router.get('/charts', ensureAuthenticated,function(req, res) {
  if (!req.isAuthenticated()) {
      let errors = [];
      res.redirect('index', { errors });
  } else {
        console.log("IN CHARTS ");
        Stock.find({}, function(err, allItems) {
            if (err) {
                console.log("THIS IS ERRROR " + err);
            } else {
                dataList = []
                labels = []
                console.log("STOCK => " + allItems);
                for (var i = 0; i < allItems.length; i++) {
                  dataList.push(allItems[i]['quantity']);
                  labels.push(i);
                }
                console.log("DATALIST=> " + dataList + " labels => " + labels);
                dataObj = {"labels": labels, "series": dataList };
                res.render('charts', {
                    data: { name:req.user.name, dataList: dataObj}
                })
          }
  })
}


});












module.exports = router;