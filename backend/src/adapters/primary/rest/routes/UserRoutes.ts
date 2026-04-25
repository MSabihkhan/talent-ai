import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export function createUserRoutes(ctrl: UserController): Router {
  const router = Router();
  router.post('/register', ctrl.register);
  router.post('/login', ctrl.login);  
  return router;
}
