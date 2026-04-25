export interface User {
  id?: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'candidate' | 'recruiter' | 'admin';
  createdAt?: Date;
}
