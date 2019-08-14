/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

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
    res.send({ for_now_go_to: 'http://127.0.0.1:4000/auth/linkedin' });
  };

  const getProfile = async (req, res, next) => {
    if (req.user) {
      const user = await User.findById(
        req.user.id,
      );
      res.send(user);
    } else {
      res.redirect('./login');
    }
    return next();
  };

  return {
    getAll,
    login,
    getProfile,
  };
};

export default usersController;
