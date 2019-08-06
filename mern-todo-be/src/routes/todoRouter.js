/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import { Router } from 'express';

import Todo from '../models/todoModel';

const todoRouter = Router();

todoRouter.route('/')
  .get(async (req, res) => {
    const { query } = req;
    const todos = await Todo.find(query)
      .catch((err) => {
        res.status(500).send(`Something went wrong: ${err}`);
      });
    return res.status(200).send(todos);
  })
  .post(async (req, res) => {
    const todo = await Todo.create(
      req.body,
    );
    return res.status(201).send(todo);
  });

// :todoId middleware
todoRouter.use('/:todoId', async (req, res, next) => {
  const todo = await Todo.findById(
    req.params.todoId,
  )
    .catch((err) => {
      res.status(404).send(`Data not found: ${err}`);
    });
  req.todo = todo;
  return next();
});

todoRouter.route('/:todoId')
  .get(async (req, res) => res.send(req.todo))
  .put(async (req, res) => {
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
  })
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    await req.todo.remove().then(() => {
      res.status(204).send('Todo deleted!');
    })
      .catch((err) => {
        res.status(400).send(`Delete not possible: ${err}`);
      });
  });

export default todoRouter;
