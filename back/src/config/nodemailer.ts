import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'

dotenv.configDotenv({ path: '.env' })

export const nodemailerConfig = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false, // Permite certificados autofirmados
      },
}

export const createTransporter = () => nodemailer.createTransport(nodemailerConfig)

