export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'candidate' | 'recruiter' | 'admin';
  createdAt?: Date;
}
