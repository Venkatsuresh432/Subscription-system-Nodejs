import { config } from 'dotenv';

// Load env file based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export specific env variables
export const { 
    PORT,
    NODE_ENV, 
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRATION,
    ARCJET_API_KEY,
    ARCJET_ENV,
    QSTASH_TOKEN,
    QSTASH_URL,
    SERVER_URL,
    SENDERMAILPASSWORD,
    SENDER_MAIL
 } = process.env;

console.log('NODE_ENV:', process.env.NODE_ENV)

console.log('PORT:', process.env.PORT);


// teVRkgf7nw9pG9V5