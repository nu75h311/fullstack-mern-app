import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

import models from '../../../models';
import ids from '../_config';
import serializersInit from '../serializers';

passport.use(new LinkedInStrategy({
  clientID: ids.linkedin.clientID,
  clientSecret: ids.linkedin.clientSecret,
  callbackURL: ids.linkedin.callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true,
}, (accessToken, refreshToken, profile, done) => {
  const searchQuery = {
    passportStrategyId: profile.id,
  };

  const updates = {
    name: profile.displayName,
    passportStrategyId: profile.id,
    email: profile.emails[0].value,
  };

  const options = {
    new: true,
    upsert: true,
  };

  process.nextTick(() => {
    models.User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  });
}));

// serialize user into the session
serializersInit();

export default passport;
