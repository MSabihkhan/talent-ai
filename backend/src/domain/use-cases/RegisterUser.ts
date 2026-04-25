import { User } from '../models/User';
import { IUserRepository } from '../ports/secondary/IUserRepository';

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Note: Password hashing should happen here or via another port/service
    return this.userRepository.save(userData);
  }
}
