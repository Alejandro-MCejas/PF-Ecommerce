import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { CronService } from "./cron.service";
import { NotificationsModule } from "src/notifications/notifications.module";
import { ProductsModule } from "src/products/products.module";



@Module({
    imports: [ScheduleModule.forRoot(), NotificationsModule, ProductsModule],
    providers: [CronService]
})

export class CronModule { }
