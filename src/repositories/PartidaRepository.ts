import { Partida } from "../models/PartidaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IPartidaRepository } from "./IPartidaRepository";

@EntityRepository(Partida)
export class PartidaRepository extends Repository<Partida> implements IPartidaRepository {

    findByRodada(numRodada: number) {
        return this.findOne({ where: { rodada: numRodada } });
    }
    findById(id: number) {
        return this.findOne({ where: { id } });
    }
    findBySlug(slugId: string) {
        return this.findOne({ where: { slug: slugId } });
    }
}