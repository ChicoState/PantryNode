var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

var { Sequelize } = require( 'sequelize');
var { initModels, item, stock } = require( "../models/init-models");

const sequelize = new Sequelize(require('../config/keys').PostgresURI);

initModels(sequelize);


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
    const errors = [];
    res.redirect('index');
  } else {
    item.findAll().then((allItems) => {
      if (allItems == null) {
        console.log("THIS IS ERROR " + item);
      } else {
        console.log("Check");
        // console.log(allItems);
        const oneDay = 24 * 60 * 60 * 1000;
        for (let i = 0; i < allItems.length; i++) {
          // const diff = Math.round(Math.abs((new Date().getTime() - new Date(allItems[i]['dateExp']).getTime()) / oneDay)) as number;
        //   console.log("Days:" + diff);
        //   if (diff <= 2) {
        //     ids.push(allItems[i]);
        //   }
        // }
        // console.log(ids);
        if (allItems.length > 0) {
          res.render('dashboard', {
            data: { name: req.user, allItems }
          })
        } else {
          res.render('dashboard', {
            data: { name: req.user }
          })
        }
      }
    }
    });
  }
});

// Define the route GET function
router.get('/barcode/:barcode_num', async (req, res) => {
  const barcode_num = req.params.barcode_num;
  const result = await item.findOne({ where: { barcode_num } });
  
  if (!result) {
    // Return 404 if no item was found with the given barcode number
    return res.status(404).send('Item not found');
  }
  
  // Return the item object if it exists
  return res.send(result);
});





module.exports = router;