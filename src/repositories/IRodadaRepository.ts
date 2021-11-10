import { Rodada } from "../models/RodadaEntity";


export interface IRodadaRepository {
    findAll(): Promise<Rodada[]>;
    findByNumeroRodada(id: number): Promise<Rodada>;
    save(rodada: Rodada): Promise<Rodada[]>;
}