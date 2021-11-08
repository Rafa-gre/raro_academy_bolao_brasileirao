import { Campeonato } from "../models/CampeonatoEntity";
import { EntityRepository, Repository } from "typeorm";
import { ICampeonatoRepository } from "./ICampeonatoRepository";

@EntityRepository(Campeonato)
export class CampeonatoRepository extends Repository<Campeonato> implements ICampeonatoRepository {
    findByEmail(email: string): Promise<Campeonato> {
        return this.findOne({ where: { email } });
    }

    findById(id: number) {
        return this.findOne(id);
    }
}