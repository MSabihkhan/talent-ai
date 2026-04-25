import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../auth/authMiddleware';


export function createUserRoutes(ctrl: UserController): Router {
  const router = Router();
  router.post('/register', ctrl.register);
  router.post('/login', ctrl.login);  
  router.put('/profile',authMiddleware,ctrl.update);
  router.delete('/profile', authMiddleware, ctrl.delete);
  return router;
}
