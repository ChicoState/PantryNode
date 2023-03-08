const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
import { initModels, person } from "../models-test/init-models";

var con_string = require('../config/keys').PostgresURI;
const sequelize = new Sequelize(con_string)

initModels(sequelize);

module.exports = function (passport) {
    passport.use(

        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            person.findOne({where : { email: email }})
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'User does not exist' });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'User does not exist' });
                        }

                    });
                })
                .catch(err => console.log(err));
        })

    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}