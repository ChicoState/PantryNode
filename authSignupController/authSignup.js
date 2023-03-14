const User = require('../models/User');


async function authSignupController(req, res) {
    const { name, email, password, phone } = req.body;
  
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          let errors = [];
          errors.push({ msg: 'User Exist!' });
          res.render('signup', { errors });
        }
        else {
          const newUser = new User({
            name,
            email,
            password,
            phone
          });
  
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save();
            }))
          console.log(newUser);
          return res.render('./signup_success', { title: 'Express' });
        }
  
      });
    ;
  }

  module.exports = { authSignupController };