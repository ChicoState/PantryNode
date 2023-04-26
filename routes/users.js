var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');
const { authSignupController } = require('../authSignupController/authSignup');
const User = require('../models/User');
const mongoose = require('mongoose');
var db = require('../config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true });

router.get('/register', function (req, res, next) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.json({ errors });

  }
  else {
    res.redirect('/home');
  }
});

router.post('/sign_up', authSignupController);


router.get('/login', function (req, res, next) {
  res.json({ title: 'Express' });
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
  res.json({ title: 'Express' });
});



module.exports = router;
