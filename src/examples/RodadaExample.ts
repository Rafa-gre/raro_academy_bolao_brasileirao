import { RodadaService } from "../service/RodadaService";
import { Connection } from "typeorm";
import { RodadaRepository } from "../repositories/RodadaRepository";



export const criarRodada = async (connection: Connection) => {
    const rodadaRepo = connection.getCustomRepository(RodadaRepository);
    const rodadaService = new RodadaService(rodadaRepo);


    const result = await rodadaService.criar(connection);
    console.log('========= result', result);
}