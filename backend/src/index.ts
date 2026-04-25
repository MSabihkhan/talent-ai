import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Domain & Adapters
import { MongooseUserRepository } from './adapters/secondary/db/MongooseUserRepository';
import { RegisterUser } from './domain/use-cases/RegisterUser';
import { UserController } from './adapters/primary/rest/controllers/UserController';
import { createUserRouter } from './adapters/primary/rest/routes/UserRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- Dependency Injection (Wiring) ---
// 1. Secondary Adapters (Infrastructure)
const userRepository = new MongooseUserRepository();

// 2. Use Cases (Application Logic)
const registerUser = new RegisterUser(userRepository);

// 3. Primary Adapters (Entry Points)
const userController = new UserController(registerUser);
const userRouter = createUserRouter(userController);

// --- Routes ---
app.use('/api/users', userRouter);

// --- Database & Server Start ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talentai';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
