import "reflect-metadata";
import { DataSourceOptions } from "typeorm";
import "dotenv/config";
import {RequestEntity} from "../entities/request";
import {FStationEntity} from "../entities/fstation";
import {RTeamEntity} from "../entities/rteam";

//an object with the variables that are used to connect to the db
export const ormConfig: DataSourceOptions = {

  //posgres sql database
  type: "postgres",

  // environment variables
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_NAME,

  //initialize entities, synchronize database 
  entities: [RequestEntity, FStationEntity, RTeamEntity],
  synchronize: true,
  // logging: !process.env.inProduction ? ["error", "migration", "warn"] : false,
  // ssl: !process.env.inProduction ? false : { rejectUnauthorized: false },
};
