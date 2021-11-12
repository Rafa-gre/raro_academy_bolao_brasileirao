import { Aposta } from "../models/ApostaEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IApostaRepository {
    save(aposta: Aposta): Promise<Aposta>;
    findById(id: number): Promise<Aposta>;
    update(id: number, aposta: QueryDeepPartialEntity<Aposta>): Promise<UpdateResult>;
}