/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const todosController = (Todo) => {
  const getAll = async (req, res, next) => {
    if (req.user) {
      const { query } = req;
      query.creatorId = req.user.passportStrategyId;
      console.log(query);
      const todos = await Todo.find(query)
        .catch((err) => {
          res.status(500).send(`Something went wrong: ${err}`);
        });
      const returnTodos = todos.map((todo) => {
        const newTodo = todo.toJSON();
        newTodo.links = {};
        newTodo.links.self = `http://${req.headers.host}/todos/${todo._id}`;
        return newTodo;
      });
      res.status(200);
      res.send(returnTodos);
    } else {
      res.redirect('../users/login');
    }
    return next();
  };

  const create = async (req, res) => {
    const newTodo = req.body;
    newTodo.creatorId = req.user.passportStrategyId;
    const todo = await Todo.create(
      newTodo,
    )
      .catch((err) => {
        res.status(400).send(`Something went wrong: ${err}`);
      });
    res.status(201);
    return res.send(todo);
  };

  // :todoId middleware
  const findOne = async (req, res, next) => {
    const todo = await Todo.findById(
      req.params.todoId,
    )
      .catch((err) => {
        res.status(404).send(`Data not found: ${err}`);
      });
    req.todo = todo;
    return next();
  };

  const getOne = async (req, res) => {
    const returnTodo = req.todo.toJSON();
    const responsible = req.todo.responsible.replace(' ', '%20');
    returnTodo.links = {};
    returnTodo.links.FilterByThisResponsible = `http://${req.headers.host}/todos/?responsible=${responsible}`;

    res.send(returnTodo);
  };

  const replaceOne = async (req, res) => {
    const { todo } = await req;
    todo.description = req.body.description;
    todo.responsible = req.body.responsible;
    todo.priority = req.body.priority;
    todo.completed = req.body.completed;

    todo.save().then(() => {
      res.status(200).send('Todo updated!');
    })
      .catch((err) => {
        res.status(400).send(`Update not possible: ${err}`);
      });
  };

  const updateOne = async (req, res) => {
    const { todo } = await req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      todo[key] = value;
    });

    todo.save().then(() => {
      res.status(200).send('Todo updated!');
    })
      .catch((err) => {
        res.status(400).send(`Update not possible: ${err}`);
      });
  };

  const deleteOne = async (req, res) => {
    await req.todo.remove().then(() => {
      res.status(204).send('Todo deleted!');
    })
      .catch((err) => {
        res.status(400).send(`Delete not possible: ${err}`);
      });
  };

  return {
    getAll, create, findOne, getOne, replaceOne, updateOne, deleteOne,
  };
};

export default todosController;
