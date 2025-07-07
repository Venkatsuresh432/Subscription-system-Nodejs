import nodeMailer from 'nodemailer';
import { SENDERMAILPASSWORD, SENDER_MAIL } from './env.js';

export const accountEmail =  SENDER_MAIL;

const transporter  = nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth:{
        user:SENDER_MAIL,
        pass:SENDERMAILPASSWORD
    }
})


export default transporter;