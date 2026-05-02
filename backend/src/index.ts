import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongooseUserRepository } from './adapters/secondary/db/MongooseUserRepository';
import { RegisterUser } from './domain/use-cases/RegisterUser';
import { UserController } from './adapters/primary/rest/controllers/UserController';
import { createUserRoutes } from './adapters/primary/rest/routes/UserRoutes';
import { LoginUser } from './domain/use-cases/LoginUser';
import { DeleteUser } from './domain/use-cases/DeleteUser';
import { UpdateProfile } from './domain/use-cases/UpdateProfile';
import { ParseCvUseCase } from './domain/use-cases/ParseCvUseCase';       
import { SaveProfileUseCase } from './domain/use-cases/SaveProfileUseCase'; 
import { GetProfileUseCase } from './domain/use-cases/GetProfileUseCase';   
import { OpenRouterService } from './adapters/secondary/ai/OpenAIService';
import { AnalyzeCvUseCase } from './domain/use-cases/AnalyzeCvUseCase';

// ✅ ADD THESE IMPORTS
import { JobRepository } from './adapters/secondary/db/JobRepository';
import { JobController } from './adapters/primary/rest/controllers/IJobController';
import {JobRoutes} from './adapters/primary/rest/routes/JobRoutes'

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

const app = express();
app.use(express.json());

// ============ USER SETUP ============
const userRepository = new MongooseUserRepository();
const aiService = new OpenRouterService();                        

const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const updateProfile = new UpdateProfile(userRepository);
const parseCvUseCase = new ParseCvUseCase(aiService);         
const saveProfileUseCase = new SaveProfileUseCase(userRepository);
const getProfileUseCase = new GetProfileUseCase(userRepository);   
const analyzeCvUseCase = new AnalyzeCvUseCase(aiService);

const userController = new UserController(
  registerUser,
  loginUser,
  updateProfile,
  deleteUser,
  parseCvUseCase,      
  saveProfileUseCase,  
  getProfileUseCase,
  analyzeCvUseCase
);
// ============ JOB SETUP ✅ ============
const jobRepository = new JobRepository();
const jobController = new JobController(jobRepository, userRepository);

// ============ ROUTES ============
app.use('/api/users', createUserRoutes(userController));
app.use('/api', JobRoutes(jobController));

// ============ START SERVER ============
mongoose.connect(mongoUri!)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
  })
  .catch((err) => console.error('❌ DB error:', err));