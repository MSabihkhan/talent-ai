import { IUserRepository } from '../../../domain/ports/secondary/IUserRepository';
import { User } from '../../../domain/models/User';
import { UserModel } from './UserSchema';

export class MongooseUserRepository implements IUserRepository {

  async findByEmail(email: string) {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
  return {
    id: userDoc.id,
    name: userDoc.name,
    email: userDoc.email,
    passwordHash: userDoc.passwordHash,
    role: userDoc.role as 'candidate' | 'recruiter' | 'admin',
    createdAt: userDoc.createdAt as Date,
    phone: userDoc.get('phone')?? null,    
    location: userDoc.get('location')?? null 
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
    createdAt: userDoc.createdAt as Date,
    phone: userDoc.get('phone')?? null,    
    location: userDoc.get('location')?? null 
  };
  }

async save(user: User): Promise<User> {
  const created = await UserModel.create(user);
  
  return {
    id: created.id,
    name: created.name,
    email: created.email,
    passwordHash: created.passwordHash,
    role: created.role as 'candidate' | 'recruiter' | 'admin',
    createdAt: created.createdAt,
    phone: created.get('phone')?? null,
    location: created.get('location') ?? null
  };
}

  async exists(email: string) {
    return !!(await UserModel.findOne({ email }));
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
  const updatedDoc = await UserModel.findOneAndUpdate({ id }, { $set: data }, { new: true });
  if (!updatedDoc) return null;

  return {
    id: updatedDoc.id,
    name: updatedDoc.name,
    email: updatedDoc.email,
    role: updatedDoc.role as 'candidate' | 'recruiter' | 'admin',
    createdAt: updatedDoc.createdAt,       
    phone: updatedDoc.get('phone')?? null,        
    location: updatedDoc.get('location')?? null   
  };
}

async delete(id: string): Promise<boolean> {
  const result = await UserModel.deleteOne({ id });
  return result.deletedCount > 0;
}
}