import { ormConfig } from "../config/orm.config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource(ormConfig);

export const connect = () => {
  AppDataSource.initialize()
    .then(() => {
      console.info("[Fire Service SQL DB] --> connected to DB");
    })
    .catch((error: any) => {
      console.log(error);

      console.error(`[Fire Service SQL DB] --> [DB Connection Error] --> ${error.message}`);
    });
};