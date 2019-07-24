import { Router } from 'express';

const todoRouter = Router();

todoRouter.get('/', async (req, res) => {
  const todos = await req.context.models.Todo.find();
  return res.send(todos);
});

todoRouter.get('/:todoId', async (req, res) => {
  const todo = await req.context.models.Todo.findById(
    req.params.todoId,
  )
    .catch((err) => {
      res.status(404).send('data not found');
    });
  return res.send(todo);
});

todoRouter.post('/add', async (req, res) => {
  const todo = await req.context.models.Todo.create({
    todo_description: req.body.todo_description,
    todo_responsible: req.body.todo_responsible,
    todo_priority: req.body.todo_priority,
    todo_completed: req.body.todo_completed,
  });

  return res.status(200).send(todo);
});

todoRouter.post('/update/:todoId', async (req, res) => {
  const todo = await req.context.models.Todo.findById(
    req.params.todoId,
  )
    .catch((err) => {
      res.status(404).send('data not found');
    });

  todo.todo_description = req.body.todo_description;
  todo.todo_responsible = req.body.todo_responsible;
  todo.todo_priority = req.body.todo_priority;
  todo.todo_completed = req.body.todo_completed;

  todo.save().then((todo) => {
    res.status(200).send('Todo updated!');
  })
    .catch((err) => {
      res.status(400).send('Update not possible');
    });
});

export default todoRouter;
