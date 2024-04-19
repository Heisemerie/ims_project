import { AppDataSource } from "../database/sql";
import { RequestEntity } from "../entities";

export const RequestRepository = AppDataSource.getRepository(RequestEntity).extend({});
