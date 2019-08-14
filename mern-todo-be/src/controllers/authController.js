/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import passportLinkedIn from '../server/auth/strategies/linkedin';

const authController = () => {
  const authLinkedin = passportLinkedIn.authenticate('linkedin');

  const authLinkedinCallback = passportLinkedIn.authenticate('linkedin', {
    successRedirect: '/todos',
    failureRedirect: '/login',
  });

  return {
    authLinkedin,
    authLinkedinCallback,
  };
};

export default authController;
