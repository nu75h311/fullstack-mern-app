/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import passportLinkedIn from '../server/auth/linkedin';

const usersController = (User) => {
  const getAll = async (req, res) => {
    const { query } = req;
    const users = await User.find(query)
      .catch((err) => {
        res.status(500).send(`Something went wrong: ${err}`);
      });
    res.status(200);
    return res.send(users);
  };

  const login = async (req, res) => {
    res.send('Go back and register!');
  };

  const authLinkedin = passportLinkedIn.authenticate('linkedin');

  const authLinkedinCallback = passportLinkedIn.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login',
  });

  return {
    getAll,
    login,
    authLinkedin,
    authLinkedinCallback,
  };
};

export default usersController;
