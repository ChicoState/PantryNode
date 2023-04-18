var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');
var { initModels, person } = require( "../models/init-models");
var { Sequelize } = require('sequelize');



var con_string = require('../config/keys').PostgresURI;
const sequelize = new Sequelize(con_string)

initModels(sequelize);

router.get('/register', function (req, res, next) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.render('signup', { errors });
  }
  else {
    res.redirect('/home');
  }
});

router.post('/sign_up', function (req, res) {
  const { name, email, password, phone } = req.body;
  person.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      fname: name,
      lname: name,
      password: "placeholder",
      phone: phone
    }
  }).then(([user, created]) => {
      if (!created) {
        let errors = [];
        errors.push('User Exist!' );
        res.render('signup', { errors });
      }
      else {
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, async (err, hash) => {
            user.set({
              password: hash,
            });
            await user.save();
          }))

        
        console.log(user);
        return res.render('./signup_success', { title: 'Express' });
      }

    });
});


router.get('/login', function (req, res, next) {
  res.render('signup_success', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      // Authentication failed
      res.status(401).json({ message: "Authentication failed", error: info.message });
    }
    else {
      res.json({ message: "Success", email: user.email });
    }
    // Authentication successful
  })(req, res, next);
});


router.get('/logout', function (req, res) {
  req.logout();
  res.render('index', { title: 'Express' });
});



module.exports = router;
