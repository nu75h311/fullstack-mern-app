import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

import models from '../../models';
import linkedin from '../_config';
import init from './init';

passport.use(new LinkedInStrategy({
  clientID: linkedin.clientID,
  clientSecret: linkedin.clientSecret,
  callbackURL: linkedin.callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true,
}, (accessToken, refreshToken, profile, done) => {
  const searchQuery = {
    name: profile.displayName,
  };

  const updates = {
    name: profile.displayName,
    someID: profile.id,
  };

  const options = {
    upsert: true,
  };

  models.User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
    if (err) {
      return done(err);
    }
    console.log(`===========HERE============${user}`);
    return done(null, user);
  });
}));

// serialize user into the session
init();

export default passport;
