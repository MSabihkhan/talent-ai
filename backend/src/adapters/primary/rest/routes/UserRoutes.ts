import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const createUserRouter = (userController: UserController) => {
  const router = Router();

  router.post('/register', (req, res) => userController.register(req, res));

  return router;
};
