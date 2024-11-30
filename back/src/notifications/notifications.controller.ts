import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post('send-email')
  async sendEmailController(@Body() body: { to: string, subject: string, templateName: string, context: any }) {

    const { to, subject, templateName, context } = body

    await this.notificationsService.sendEmailService(to, subject, templateName, context)

    return { message: 'Email sent correctly' }
  }

  @Post('send-email-with-pdf')
  async sendEmailWithPDFController(@Body() body: { to: string, subject: string, templateName: string, context: any }) {

    const { to, subject, templateName, context } = body

    await this.notificationsService.sendEmailWithPDFService(to, subject, templateName, context)

    return { message: 'Email with PDF sent correctly' }
  }

}
