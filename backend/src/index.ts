import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongooseUserRepository } from './adapters/secondary/db/MongooseUserRepository';
import { RegisterUser } from './domain/use-cases/RegisterUser';
import { UserController } from './adapters/primary/rest/controllers/UserController';
import { createUserRoutes } from './adapters/primary/rest/routes/UserRoutes';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(express.json());

// --- Assembly (read bottom-up like a pyramid) ---
const userRepository  = new MongooseUserRepository();       
const registerUser    = new RegisterUser(userRepository);   
const userController  = new UserController(registerUser);   
app.use('/api/users', createUserRoutes(userController));    

// --- Start ---
mongoose.connect(mongoUri!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server on http://localhost:3000'));
  })
  .catch((err) => console.error('DB error:', err));