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
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT

const app = express();
app.use(express.json());

const userRepository  = new MongooseUserRepository();       
const registerUser    = new RegisterUser(userRepository);   
const loginUser = new LoginUser(userRepository)
const deleteUser = new DeleteUser(userRepository)
const updateProfile = new UpdateProfile(userRepository)
const userController  = new UserController(registerUser,loginUser,updateProfile,deleteUser);   

app.use('/api/users', createUserRoutes(userController));    

// --- Start ---
mongoose.connect(mongoUri!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server on http://localhost:${port}`));
  })
  .catch((err) => console.error('DB error:', err));