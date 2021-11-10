import { Campeonato } from "../models/CampeonatoEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface ICampeonatoRepository {
    save(campeonato: Campeonato): Promise<Campeonato>;
    findById(id: number): Promise<Campeonato>;
    update(id: number, campeonato: QueryDeepPartialEntity<Campeonato>): Promise<UpdateResult>;
}