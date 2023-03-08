var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');
import { initModels, person } from "../models-test/init-models";
const mongoose = require('mongoose');
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
    }
  }).then(([user, created]) => {
      if (!created) {
        let errors: Array<string> = [];
        errors.push('User Exist!' );
        res.render('signup', { errors });
      }
      else {
        user.set({
          fname: name,
          phone: phone,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            user.password = hash;
            user.save();
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

  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: false
  })(req, res, next);

});

router.get('/logout', function (req, res) {
  req.logout();
  res.render('index', { title: 'Express' });
});



module.exports = router;
