import { Partida } from "../models/PartidaEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IPartidaRepository {
    save(partida: Partida): Promise<Partida>;
    findByRodada(rodada: number): Promise<Partida>;
    findById(id: number): Promise<Partida>;
    findBySlug(slug: string): Promise<Partida>;
    update(id: number, partida: QueryDeepPartialEntity<Partida>): Promise<UpdateResult>;
}