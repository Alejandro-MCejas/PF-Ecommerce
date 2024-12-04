import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'

dotenv.configDotenv({ path: '.env' })

export const nodemailerConfig = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
   
}

export const createTransporter = () => nodemailer.createTransport(nodemailerConfig)

