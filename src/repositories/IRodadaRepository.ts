import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Rodada } from "../models/RodadaEntity";


export interface IRodadaRepository {
    save(time: Rodada): Promise<Rodada>;
    findAll(): Promise<Rodada[]>
    findByNumeroRodada(numeroRodada: number): Promise<Rodada>;
    update(id: number, rodada: QueryDeepPartialEntity<Rodada>): Promise<UpdateResult>;
}