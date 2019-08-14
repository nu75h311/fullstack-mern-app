import { Router } from 'express';

import controllers from '../controllers';

const authRouter = Router();
const authController = controllers.authController();

authRouter.route('/linkedin')
  .get(authController.authLinkedin);

authRouter.route('/linkedin/callback')
  .get(authController.authLinkedinCallback);

export default authRouter;
