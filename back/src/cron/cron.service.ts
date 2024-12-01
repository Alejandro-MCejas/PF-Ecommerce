import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationsService } from "src/notifications/notifications.service";


@Injectable()
export class CronService {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Cron(CronExpression.EVERY_DAY_AT_5PM)
    async sendDailyEmail() {
        console.log('Enviando correo diario...');

        const users = ['alejandro.06555@gmail.com', 'agustinanahirblanco@gmail.com', 'valensparvoli@gmail.com',]

        await Promise.all(users.map(email => this.notificationsService.sendEmailService(
            email,
            'Correo Diario',
            'email/daily-notification',
            { nombre: 'Cron' }
        )))
    }
}