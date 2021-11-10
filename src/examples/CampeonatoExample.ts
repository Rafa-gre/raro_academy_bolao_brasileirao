
import { Connection } from "typeorm";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";
import { CampeonatoService } from "../service/CampeonatoService";

export const criarCampeonato = async (connection: Connection) => {
    const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
    const campeonatoService = new CampeonatoService(campeonatoRepo);


    const result = await campeonatoService.criar(10);
    console.log('========= result', result);
}
export const buscarCampeonato = async (connection: Connection) => {
    const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
    const campeonatoService = new CampeonatoService(campeonatoRepo);
    await campeonatoService.buscarCampeonatoApi(10);
    console.log('========= result', campeonatoRepo.findOne({ where: { idCampeonatoApiExterna: 10 } }));
};