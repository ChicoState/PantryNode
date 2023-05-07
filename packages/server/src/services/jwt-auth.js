const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Token = require("../models/Token");
const jwtSecret = require("../config/jwt-config");

const User = require("../models/User");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "test-secret-10-02-2023",
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({ where: { email: payload.email } });

        if (!user) {
          return done(null, false);
        }

        const token = await Token.findOne({
          where: { userId: user.id },
        });
        if (!token) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
