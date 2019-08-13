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

  return {
    getAll,
  };
};

export default usersController;
