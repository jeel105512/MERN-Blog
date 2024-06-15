import JwtStrategy from "passport-jwt/lib/strategy.js";
import ExtractJwt from "passport-jwt/lib/extract_jwt.js";
import passport from "passport";

import User from "../models/user.model.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (app) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );

  app.use(passport.initialize());
};
