import { Router } from 'express';

import controllers from '../controllers';

const authRouter = Router();
const authController = controllers.authController();

authRouter.route('/linkedin')
  .get(authController.authLinkedin);

authRouter.route('/linkedin/callback')
  .get(authController.authLinkedinCallback);

authRouter.route('/login/success')
  .get(authController.loginSuccess);

authRouter.route('/login/failed')
  .get(authController.loginFailed);

authRouter.route('/logout')
  .get(authController.logout);

export default authRouter;
