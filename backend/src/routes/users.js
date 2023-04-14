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

router.post('/login', (req, res, next) => {
  // TODO(#118): Remove this log, return real data.
  console.log("this is login: ", req.body);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })(req, res, next);

});

router.get('/logout', function (req, res) {
  req.logout();
  res.render('index', { title: 'Express' });
});



module.exports = router;
