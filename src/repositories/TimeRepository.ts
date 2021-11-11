import { Time } from "../models/TimeEntity";
import { EntityRepository, Repository } from "typeorm";
import { ITimeRepository } from "./ITimeRepository";

@EntityRepository(Time)
export class TimeRepository extends Repository<Time> implements ITimeRepository {

    findById(id: number) {
        return this.findOne(id);
    }
}