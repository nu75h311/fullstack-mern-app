import passport from 'passport';
import models from '../../models';

const serializer = (user, done) => {
  done(null, user.id);
};

const deserializer = (id, done) => {
  models.User.findById(id, (err, user) => {
    done(err, user);
  });
};

export default () => {
  passport.serializeUser(serializer);
  passport.deserializeUser(deserializer);
};
