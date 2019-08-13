/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const todosController = (Todo) => {
  const getAll = async (req, res) => {
    const { query } = req;
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
    return res.send(returnTodos);
  };

  const create = async (req, res) => {
    const todo = await Todo.create(
      req.body,
    );
    if (!req.body.todo_description) {
      res.status(400);
      return res.send('Description is required');
    }
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
    const responsible = req.todo.todo_responsible.replace(' ', '%20');
    returnTodo.links = {};
    returnTodo.links.FilterByThisResponsible = `http://${req.headers.host}/todos/?todo_responsible=${responsible}`;

    res.send(returnTodo);
  };

  const replaceOne = async (req, res) => {
    const { todo } = await req;
    todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

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
