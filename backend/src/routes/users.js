var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var passport = require('passport');
const jwt = require('jsonwebtoken');
var { initModels, person } = require( "../models/init-models");
var { Sequelize } = require('sequelize');



var con_string = require('../config/keys').PostgresURI;
const sequelize = new Sequelize(con_string)

initModels(sequelize);

router.get('/register', function (req, res, next) {
  if (!req.isAuthenticated()) {
    let errors = ['User not authenticated'];
    res.status(400).json({ errors });
  } else {
    res.status(200).json({ message: 'Redirect to /home' });
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
        // let errors = [];
        // errors.push('User Exist!' );
        res.status(409).json({ error: 'User Exist!' });
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
        return res.status(201).json({ user });

      }

    });
});


router.get('/login', function (req, res, next) {
  res.status(200).json({ message: 'Signup successful'});
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      // Authentication failed
      res.status(401).json({ message: "Authentication failed", error: info.message });
    }
    else {
      token = jwt.sign({ email: user.email }, "secret",{ expiresIn: '1h'})
      res.json({token:token, message: "Success", email: user.email});
    }
    // Authentication successful
  })(req, res, next);
});


router.get('/logout', function (req, res) {
  res.status(200).send({ title: 'Express' });
});



module.exports = router;
