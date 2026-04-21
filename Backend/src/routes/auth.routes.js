import express from 'express'
import { login, register } from '../controllers/auth.controller.js';
import { validationResults, LoginValidation } from '../validators/auth.validation.js';

const authRouter = express.Router();


authRouter.post('/register', validationResults, register);
authRouter.post("/login", LoginValidation, login);






export default authRouter;