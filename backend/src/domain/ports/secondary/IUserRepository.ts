import { User } from '../../models/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
  update(id: string, data: Partial<User>): Promise<User | null>; 
  delete(id: string): Promise<boolean>;
}