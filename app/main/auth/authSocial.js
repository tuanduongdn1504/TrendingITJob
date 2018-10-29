'use strict';

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FB_ID || '102358607029201',
  clientSecret: process.env.FB_SECRET || 'c002d5fcb30bf67d2ef64bd50aa7d4f4'
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}
));

module.exports = passport;
