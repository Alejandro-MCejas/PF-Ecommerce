import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { renderTemplate } from 'src/config/ejs';
import { createTransporter } from 'src/config/nodemailer';
import { generatePDF } from 'src/config/puppeteer';

@Injectable()
export class NotificationsService {
    private transporter

    constructor() {
        this.transporter = createTransporter()
    }

    async sendEmailService(to: string, subject: string, templateName: string, context: any) {
        const html = await renderTemplate(templateName, context)

        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        }
        console.log(mailOptions);


        await this.transporter.sendEmail(mailOptions)
    }

    async sendEmailWithPDFService(to: string, subject: string, templateName: string, context: any) {
        const html = await renderTemplate(templateName, context)
        const pdfBuffer = await generatePDF(html)

        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html,
            attachments: [
                {
                    filename: 'documento.pdf',
                    content: pdfBuffer,
                    encoding: 'base64'

                }
            ]
        }
        await this.transporter.sendMail(mailOptions)
    }
}
