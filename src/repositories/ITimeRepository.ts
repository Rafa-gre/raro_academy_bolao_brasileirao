import { Time } from "../models/TimeEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface ITimeRepository {
    save(time: Time): Promise<Time>;
    findById(id: number): Promise<Time>;
    update(id: number, time: QueryDeepPartialEntity<Time>): Promise<UpdateResult>;
}