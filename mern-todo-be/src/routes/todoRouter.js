import { Router } from 'express';

import controllers from '../controllers';
import Todo from '../models/todoModel';

const todoRouter = Router();
const todosController = controllers.todosController(Todo);

todoRouter.route('/')
  .get(todosController.getAll)
  .post(todosController.create);

// :todoId middleware
todoRouter.use('/:todoId', todosController.findOne);

todoRouter.route('/:todoId')
  .get(todosController.getOne)
  .put(todosController.replaceOne)
  .patch(todosController.updateOne)
  .delete(todosController.deleteOne);

export default todoRouter;
