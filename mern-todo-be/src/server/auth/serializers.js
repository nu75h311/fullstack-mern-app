import passport from 'passport';
import models from '../../models';

const serializer = (user, done) => {
  done(null, user.id);
};

const deserializer = (userId, done) => {
  models.User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch(() => {
      done(new Error('Failed to deserialize an user'));
    });
};

export default () => {
  passport.serializeUser(serializer);
  passport.deserializeUser(deserializer);
};
