import { Aposta } from "../models/ApostaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IApostaRepository } from "./IApostaRepository";


@EntityRepository(Aposta)
export class ApostaRepository extends Repository<Aposta> implements IApostaRepository {
    findByEmail(email: string): Promise<Aposta> {
        return this.findOne({ where: { email } });
    }

    findById(idApostaApiExterna: number) {
        return this.findOne({ where: { idApostaApiExterna } });
    }
}