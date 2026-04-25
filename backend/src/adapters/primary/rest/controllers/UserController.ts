import { Request, Response } from 'express';
import { RegisterUser } from '../../../../domain/use-cases/RegisterUser';
import { AppError } from '../../../../shared/errors/AppError';
import { LoginUser } from '@/domain/use-cases/LoginUser';
import { DeleteUser } from '@/domain/use-cases/DeleteUser';
import { UpdateProfile } from '@/domain/use-cases/UpdateProfile';


export class UserController {
  constructor(private registerUser: RegisterUser,
  private loginUser: LoginUser,
  private updateProfile:UpdateProfile,
  private deleteUser: DeleteUser
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await this.registerUser.execute({ name, email, password, role });
      res.status(201).json({
        message: 'Registered successfully',
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message, code: err.code });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
  
  login =async (req: Request, res:Response)=> {
    try{
        const {email,password} = req.body;
        const result = await this.loginUser.execute({email,password})
        res.status(200).json(result)
    }
    catch (err) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message, code: err.code });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  
  delete = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id; 
      const result = await this.deleteUser.execute(userId);
      res.status(200).json(result);
    } catch (err) {
      this.handleError(res, err);
    }
  };
  
  private handleError(res: Response, err: any) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: err.message, code: err.code });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  update = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 
    
    const result = await this.updateProfile.execute(userId, req.body);
    res.status(200).json(result);
  } catch (err) {
    this.handleError(res, err);
  }
};
}