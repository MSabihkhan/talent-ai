import { IUserRepository } from '../../../domain/ports/secondary/IUserRepository';
import { User } from '../../../domain/models/User';
import { UserModel } from './UserSchema';

export class MongooseUserRepository implements IUserRepository {

  async findByEmail(email: string) {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;

  // We manually "map" the database fields to the Domain User
  return {
    id: userDoc.id,
    name: userDoc.name,
    email: userDoc.email,
    passwordHash: userDoc.passwordHash,
    role: userDoc.role as 'candidate' | 'recruiter' | 'admin',
    createdAt: userDoc.createdAt as Date
  };
  }

  async findById(id: string) {
    const userDoc = await UserModel.findOne({ id });
    if (!userDoc) return null;
    return {
    id: userDoc.id,
    name: userDoc.name,
    email: userDoc.email,
    passwordHash: userDoc.passwordHash,
    role: userDoc.role as 'candidate' | 'recruiter' | 'admin',
    createdAt: userDoc.createdAt as Date
  };
  }

async save(user: User): Promise<User> {
  // Directly create the user; if it fails, Mongoose will throw an error
  const created = await UserModel.create(user);
  
  return {
    id: created.id,
    name: created.name,
    email: created.email,
    passwordHash: created.passwordHash,
    role: created.role as 'candidate' | 'recruiter' | 'admin',
    createdAt: created.createdAt
  };
}

  async exists(email: string) {
    return !!(await UserModel.findOne({ email }));
  }
}