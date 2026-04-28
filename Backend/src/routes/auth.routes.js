import express from 'express'
import { getme, googleCallBack, login, register } from '../controllers/auth.controller.js';
import { validationResults, LoginValidation } from '../validators/auth.validation.js';
import passport from 'passport';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();


authRouter.post('/register', validationResults, register);
authRouter.post("/login", LoginValidation, login);

authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/google/callback',
  passport.authenticate('google', { session: false,
    failureRedirect: 'http://localhost:5173/login'
   }),
  googleCallBack
);

authRouter.get("/getme", authenticateUser, getme)

export default authRouter;