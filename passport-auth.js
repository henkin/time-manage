const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./local/config').google;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.info('serialize user:', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.info('DEserialize user', user)
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackUrl
  },
  (token, refreshToken, profile, done) => {
    console.warn(`logged in. profile: `, profile, 'token: ', token)
    return done(null, {
      profile: profile,
      token: token
    });
  }));
};
