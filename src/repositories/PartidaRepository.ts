import { Partida } from "../models/PartidaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IPartidaRepository } from "./IPartidaRepository";

@EntityRepository(Partida)
export class PartidaRepository extends Repository<Partida> implements IPartidaRepository {

    findById(id: number) {
        return this.findOne(id);
    }
}