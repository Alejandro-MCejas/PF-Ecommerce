import { registerAs } from "@nestjs/config";
import { configDotenv } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

configDotenv({ path: '.env' });

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    synchronize: true, // TRUE
    logging: false,
    dropSchema: false,
    // ssl: {
    //     rejectUnauthorized: false
    // }
}
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);