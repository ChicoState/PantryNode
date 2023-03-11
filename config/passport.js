const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var { initModels, person } =  require("../models-test/init-models");
var { Sequelize } = require('sequelize');
var con_string = require('./keys').PostgresURI;
const sequelize = new Sequelize(con_string)

initModels(sequelize);

module.exports = function (passport) {
    passport.use(

        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            person.findOne({where : { email: email }})
                .then(user => {
                    if (!user) {
                        console.log("user does not exist");
                        return done(null, false, { message: 'Username or password is incorrect' });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            console.log("Login matched user");
                            return done(null, user);
                        }
                        else {
                            console.log("password is incorrect");
                            return done(null, false, { message: 'Username or password is incorrect' });
                        }

                    });
                })
                .catch(err => console.log(err));
        })

    );

    passport.serializeUser(function (user, done) {
        done(null, user.person_id);
    });

    passport.deserializeUser(function (person_id, done) {
        person.findByPk(person_id).then((user, err) => {
            done(err, user);
        })
    });

}