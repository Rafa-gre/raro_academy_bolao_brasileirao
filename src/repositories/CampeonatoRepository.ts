import { Campeonato } from "../models/CampeonatoEntity";
import { EntityRepository, Repository } from "typeorm";
import { ICampeonatoRepository } from "./ICampeonatoRepository";

@EntityRepository(Campeonato)
export class CampeonatoRepository extends Repository<Campeonato> implements ICampeonatoRepository {

    findById(idCampeonatoApiExterna: number) {
        return this.findOne({ where: { idCampeonatoApiExterna } });
    }
}