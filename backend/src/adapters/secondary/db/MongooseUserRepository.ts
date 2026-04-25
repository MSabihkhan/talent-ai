import { User } from '../../../domain/models/User';
import { IUserRepository } from '../../../domain/ports/secondary/IUserRepository';
import { UserModel } from './UserSchema';

export class MongooseUserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return this.mapToDomain(savedUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? this.mapToDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? this.mapToDomain(user) : null;
  }

  private mapToDomain(userDoc: any): User {
    return {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role,
      createdAt: userDoc.createdAt
    };
  }
}
