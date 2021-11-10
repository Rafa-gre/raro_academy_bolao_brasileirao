import { Rodada } from "../models/RodadaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IRodadaRepository } from "./IRodadaRepository";

@EntityRepository(Rodada)
export class RodadaRepository extends Repository<Rodada> implements IRodadaRepository {
    findAll(): Promise<Rodada[]> {
        return this.find();
    }

    findByNumeroRodada(numeroRodada: number): Promise<Rodada> {
        return this.findOne(numeroRodada);
    }
}