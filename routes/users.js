var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');
const { authSignupController } = require('../controllers/auth');
const User = require('../models/User');
const mongoose = require('mongoose');
var db = require('../config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true });

router.get('/register', function (req, res, next) {
  if (!req.isAuthenticated()) {
    let errors = [];
    res.render('signup', { errors });
  }
  else {
    res.redirect('/home');
  }
});

router.post('/sign_up', authSignupController);


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
