import { Router } from 'express';

import controllers from '../controllers';
import User from '../models/userModel';

const userRouter = Router();
const usersController = controllers.usersController(User);

userRouter.route('/')
  .get(usersController.getAll);

userRouter.route('/login')
  .get(usersController.login);

userRouter.route('/profile')
  .get(usersController.getProfile);

export default userRouter;
