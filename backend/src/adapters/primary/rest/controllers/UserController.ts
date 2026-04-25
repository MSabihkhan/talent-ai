import { Request, Response } from 'express';
import { RegisterUser } from '../../../../domain/use-cases/RegisterUser';

export class UserController {
  constructor(private registerUserUseCase: RegisterUser) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.registerUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
