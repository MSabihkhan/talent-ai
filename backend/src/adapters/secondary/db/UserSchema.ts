import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../../domain/models/User';

export interface IUserDocument extends Omit<User, 'id'>, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['candidate', 'recruiter', 'admin'], 
    default: 'candidate' 
  },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
