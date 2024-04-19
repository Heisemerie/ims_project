import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
import "dotenv/config"
import { RequestEntity } from "../entities/request";

export const ormConfig: DataSourceOptions = {
    type: "postgres",
      
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_NAME,
        
    entities: [RequestEntity],
    synchronize: true,
    logging: !process.env.inProduction ? ["error", "migration", "warn"] : false,
    ssl: !process.env.inProduction ? false : { rejectUnauthorized: false },
  };

