import { CampeonatoDTO } from "../@types/dtos/campeonatoDto";
import { ICampeonatoRepository } from "../repositories/ICampeonatoRepository";
import { Campeonato } from "../models/CampeonatoEntity";
import CampeonatoClient from "../clients/CampeonatoClient";
import { AxiosHttpClient } from "../infra/http/AxiosHttpClient";
import { RodadaDTO } from "../@types/dtos/api-brasileirao/rodadaDto";
import { RodadaDetalhe } from "../@types/dtos/api-brasileirao/RodadaDetalhe";



export class CampeonatoService {

    constructor(private campeonatoRepository: ICampeonatoRepository
    ) { }

    async criar(idCampeonatoApiExterna: number): Promise<CampeonatoDTO> {
        try {
            const campeonato = new Campeonato();
            campeonato.idCampeonatoApiExterna = idCampeonatoApiExterna;
            const resultado = await this.campeonatoRepository.save(campeonato);
            return resultado;
        } catch (error) {

            throw error;
        }
    }
    async buscarCampeonatoApi(idCampeonatoApiExterna: number): Promise<void> {
        try {
            const httpClient = new AxiosHttpClient();
            const campeonatoClient = new CampeonatoClient(httpClient);
            campeonatoClient.idCampeonatoApiExterna = idCampeonatoApiExterna;
            const rodadas = await campeonatoClient.getRodadaAPI();
            const detalhesPromises = rodadas.map((rodada: RodadaDTO) => {
                return campeonatoClient.getRodadaDetalhesAPI(rodada.rodada)
            })
            const detalhes: RodadaDetalhe[] = await Promise.all(detalhesPromises);
            const campeonatoApi = detalhes.map((rodada: RodadaDetalhe) => { return rodada });
            const campeonato = await this.campeonatoRepository.findById(idCampeonatoApiExterna);
            if (campeonato.idCampeonatoApiExterna === campeonatoApi[1].partidas[1].campeonato.campeonato_id) {
                campeonato.nome = campeonatoApi[1].partidas[1].campeonato.nome;
                campeonato.slug = campeonatoApi[1].partidas[1].campeonato.slug;
                campeonato.status = "ativo"

                await this.campeonatoRepository.save(campeonato);
            }


        } catch (error) {
            throw error;
        }
    }

}
