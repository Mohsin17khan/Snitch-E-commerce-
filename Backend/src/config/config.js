import dotenv from 'dotenv';

dotenv.config();


if(!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the application with an error code
}
if(!process.env.JWT_SECRET) {   
    console.error('JWT_SECRET is not defined in the environment variables.');
    process.exit(1); // Exit the application with an error code
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,  
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}