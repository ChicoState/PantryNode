var express = require("express");
var router = express.Router();

//Keeping to help with conversion process
const Item = require("../models-old/Item");
const Stock = require("../models-old/Stock");
const Category = require("../models-old/Category");
const ExpiryItems = require("../models-old/ExpiryItems");
const Checkout = require("../models-old/Checkout");

var { Sequelize } = require("sequelize");

var {
  initModels,
  person,
  item,
  trans_items,
  transaction,
} = require("../models/init-models");

var con_string = require("../config/keys").PostgresURI;
const sequelize = new Sequelize(con_string);
initModels(sequelize);

const { ensureAuthenticated } = require("../config/auth");

router.get("/sale", ensureAuthenticated, function (req, res) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.redirect("index", { errors });
  } else {
    res.render("sale", {
      name: req.user.name,
    });
  }
});

router.post("/add_donor", function (req, res) {
  const { name, email, phone } = req.body;
  person
    .findOrCreate({
      where: {
        email: email,
      },
    })
    .then(([user, created]) => {
      if (!created) {
        res.redirect("/donor?error=User Exists!");
      } else {
        user.set({
          fname: name,
          phone: phone,
        });
        console.log(user);
        return res.redirect("/donor");
      }
    });
});

router.get("/donor", ensureAuthenticated, function (req, res) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.redirect("index", { errors });
  } else {
    let errors = [];
    if (Object.keys(req.query).length !== 0) {
      errors.push(req.query.error);
    }
    person
      .findAll({
        where: {
          empl_id: undefined,
        },
      })
      .then((allDonors) => {
        res.render("donor", {
          data: { name: req.user.name, donors: allDonors },
        });
      })
      .catch((err) => console.log(err));
  }
});

router.get("/categories", ensureAuthenticated, function (req, res) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.redirect("index", { errors });
  } else {
    var donor;
    var donor_name;

    if (Object.keys(req.query).length !== 0) {
      donor = req.query.id;
      donor_name = req.query.name;
    }
    console.log(donor);
    const allCategories = item.getAttributes().category?.defaultValue;
    res.render("stock", {
      data: {
        name: req.user.name,
        categories: allCategories,
        donorId: donor,
        donorName: donor_name,
      },
    });
  }
});
let itemName = item.itemName;
let itemType = item.itemType;
let dateExp = item.dateExp;

router.post("/add_stock", function (req, res) {
  const { itemName, itemType, quantity, dateExp, price, donorID } = req.body;
  item
    .findOrCreate({
      where: {
        name: itemName,
      },
    })
    .then(([new_item, created]) => {
      if (created) {
        new_item.set({
          stor_id: 1, //WILL NEED TO CHANGE ONCE FRONT END IT UPDATED
        });
        new_item.save();
        console.log(new_item);
      }
      transaction
        .create({
          person_id: donorID,
          site: 1,
          trans_type: "donation",
        })
        .then((trans) => {
          trans_items.create({
            item_id: new_item.item_id,
            expiration: dateExp,
            quantity: quantity,
            trans_id: trans.trans_id,
          });
        });
    });
  res.redirect("/stock");
});

// will need to think of a way to implement this since cat is an enum
router.post("/add_cat", function (req, res) {
  const { categoryName } = req.body;

  const newCat = new Category({
    categoryName,
  });

  newCat.save();

  // console.log(newStock);
  // console.log(newItem);

  res.redirect("/stock");
});

router.post("/checkout", ensureAuthenticated, function (req, res) {
  console.log("IN BASE...");
  let errors = [];

  const { itemId, quantityX, chicoId } = req.body;

  console.log("kkkk  => " + itemId);
  let stockID = 1;

  Item.findOne({ _id: itemId }).then((item) => {
    if (item) {
      const oneDay = 24 * 60 * 60 * 1000;
      const diff = Math.round(
        Math.abs((new Date() - new Date(item.dateExp)) / oneDay)
      );
      console.log("Days:" + diff);

      if (diff <= 2) {
        console.log("Expired Items....");
        itemName = item.itemName;
        itemType = item.itemType;
        stockID = item.stockID;
        dateExp = item.dateExp;

        Stock.findOne({ _id: stockID }).then((stk) => {
          var quantity = stk.quantity;

          const expItems = new ExpiryItems({
            itemName,
            itemType,
            quantity,
            stockID,
            dateExp,
          });

          expItems.save();
        });

        console.log("Item Table entry before removal : " + item._id);
        Item.deleteOne(
          {
            stockID: item.stockID,
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 Item deleted");
          }
        );

        Stock.deleteOne(
          {
            _id: item.stockID,
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 Stock deleted");
          }
        );

        //  Stock.remove({'_id': (item.stockID)});

        Item.find({}, function (err, allItems) {
          if (err) {
            console.log("THIS IS ERRROR " + err);
          } else {
            errors.push({
              msg:
                "The item date for  " +
                itemName +
                " has expired. Select other item.",
            });
            res.render("checkoutdetails", {
              data: { name: req.user.name, items: allItems, errors },
            });
          }
        });
      } else if (chicoId.length != 9) {
        let errors = [];

        errors.push({ msg: "Invalid Chico State ID" });

        Item.find({}, function (err, allItems) {
          if (err) {
            console.log("THIS IS ERRROR " + err);
          } else {
            res.render("checkoutdetails", {
              data: { name: req.user.name, items: allItems, errors },
            });
          }
        });
      } else {
        console.log("Active  Items....");
        Stock.findOne({ _id: item.stockID }).then((stk) => {
          if (stk) {
            if (parseInt(stk.quantity) < parseInt(quantityX)) {
              console.log("Error!");
              console.log("CC: " + stk.quantity);
              console.log("Q: " + quantityX);

              errors.push({
                msg: "There are only " + stk.quantity + " in Pantry!",
              });

              Item.find({}, function (err, allItems) {
                if (err) {
                  console.log("THIS IS ERRROR " + err);
                } else {
                  res.render("checkoutdetails", {
                    data: { name: req.user.name, items: allItems, errors },
                  });
                }
              });
            } else if (parseInt(stk.quantity) >= parseInt(quantityX)) {
              console.log("Case 2!");

              console.log(stk.quantity);
              console.log(quantityX);

              var itemName = item.itemName;
              var itemType = item.itemType;
              var stockID = stk._id;
              var quantity = quantityX;
              var chicoStateId = chicoId;
              const checkU = new Checkout({
                chicoStateId,
                itemName,
                itemType,
                stockID,
                quantity,
              });
              console.log(checkU);
              checkU.save();

              console.log(checkU);

              Stock.update(
                { _id: stk._id },
                { quantity: parseInt(stk.quantity) - parseInt(quantityX) },
                function (err, res) {
                  if (err) throw err;
                  console.log("1 document updated");
                }
              );
              Item.find({}, function (err, allItems) {
                if (err) {
                  console.log("THIS IS ERRROR " + err);
                } else {
                  console.log(" ALL ITEMS => " + allItems);
                  res.render("checkout_success", {
                    data: { name: req.user.name, items: allItems, errors },
                  });
                }
              });
              //res.render('checkout_success', {data: {}});
            } else {
              res.redirect("/checkout");
            }
          }
        });
      }
    }
  });
});

router.get("/checkout", function (req, res) {
  // if (!req.isAuthenticated()) {
  //     let errors = [];
  //     res.redirect('index', { errors });
  // } else
  {
    Item.find({}, function (err, allItems) {
      if (err) {
        console.log("THIS IS ERRROR " + err);
      } else {
        // console.log(" forward to checkout");
        // console.log(allItems);

        res.render("checkoutdetails", {
          data: { name: "Subhed", items: allItems },
        });
      }

      console.log("OUTSIDE");
    });
  }
});

router.get("/charts", ensureAuthenticated, function (req, res) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.redirect("index", { errors });
  } else {
    console.log("IN CHARTS ");

    Checkout.find({}, function (err, allItems) {
      if (err) {
        console.log("THIS IS ERRROR " + err);
      } else {
        Category.find({}, function (err, result) {
          if (err) throw err;
          else {
            Stock.find({}, function (err, allItems0) {
              if (err) {
                console.log("THIS IS ERRROR " + err);
              } else {
                console.log(allItems0);

                Item.find({}, function (err, allItems1) {
                  if (err) {
                    console.log("THIS IS ERRROR " + err);
                  } else {
                    // console.log(allItems1);

                    ExpiryItems.find({}, function (err, expItems) {
                      if (err) {
                        console.log("THIS IS ERRROR " + err);
                      } else {
                        // console.log(allItems1);

                        res.render("charts", {
                          data: {
                            name: req.user.name,
                            allItems,
                            cat: result,
                            stock: allItems0,
                            items: allItems1,
                            expired: expItems,
                          },
                        });

                        return;
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router;
