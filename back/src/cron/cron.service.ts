import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationsService } from "src/notifications/notifications.service";
import { ProductsService } from "src/products/products.service";


@Injectable()
export class CronService {
    constructor(private readonly notificationsService: NotificationsService,
        private readonly productsService: ProductsService
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_5PM)
    async sendDailyEmail() {
        console.log('Enviando correo diario...');

        const users = [
            'alejandro.06555@gmail.com',
            'agustinanahirblanco@gmail.com',
            'valensparvoli@gmail.com',
            'rossettia_martin@hotmail.com',
            'Anselmo.twitch@gmail.com'
        ];

        const topDiscountedProducts = await this.productsService.findTopDiscountedProductsService()
        console.log(topDiscountedProducts);
        await Promise.all(users.map(email => this.notificationsService.sendEmailService(
            email,
            'Correo Diario',
            'email/daily-notification',
            { products: topDiscountedProducts }
        )))
    }
}