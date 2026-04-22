import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import  passport from 'passport'
import cors from 'cors'
import { config } from './config/config.js';



const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "DELETE", "PUT" ], 
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));


app.use("/api/auth", authRouter);


export default app;