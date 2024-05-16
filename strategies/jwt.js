const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.email === 'admin@email.com') {
        return done(null, true);
    } else {
        return done(null, false);
    }
});
