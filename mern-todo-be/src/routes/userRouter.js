import { Router } from 'express';

import controllers from '../controllers';
import User from '../models/userModel';

const userRouter = Router();
const usersController = controllers.usersController(User);

userRouter.route('/')
  .get(usersController.getAll);

userRouter.route('/login')
  .get(usersController.login);

userRouter.route('/auth/linkedin')
  .get(usersController.authLinkedin);

userRouter.route('/auth/linkedin/callback')
  .get(usersController.authLinkedinCallback);

export default userRouter;
