/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import passportLinkedIn from '../server/auth/strategies/linkedin';

const CLIENT_HOME_PAGE_URL = 'http://127.0.0.1:3000';

const authController = () => {
  // Auth with LinkedIn
  const authLinkedin = passportLinkedIn.authenticate('linkedin');

  // Redirect to home page after successfully login via LinkedIn
  const authLinkedinCallback = passportLinkedIn.authenticate('linkedin', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed',
  });

  // When login is successful, retrieve user info
  const loginSuccess = async (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: 'user has successfully authenticated',
        user: req.user,
        cookies: req.cookies,
      });
    }
  };

  // When login failed, send failed msg
  const loginFailed = async (req, res) => res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });

  // When logout, redirect to client
  const logout = async (req, res) => {
    req.logout();
    return res.redirect(CLIENT_HOME_PAGE_URL);
  };

  return {
    authLinkedin,
    authLinkedinCallback,
    loginSuccess,
    loginFailed,
    logout,
  };
};

export default authController;
