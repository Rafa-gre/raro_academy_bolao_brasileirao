import { CampeonatoDTO } from "../@types/dtos/campeonatoDto";
import { ICampeonatoRepository } from "../repositories/ICampeonatoRepository";
import { ICampeonatoService } from "./ICampeonatoService";
import { Campeonato } from "../models/CampeonatoEntity";
import CampeonatoClient from "../clients/CampeonatoClient";
import { AxiosHttpClient } from "../infra/http/AxiosHttpClient";
import { Rodada as RodadaDTO } from "../@types/dtos/api-brasileirao/Rodada";
import { RodadaDetalhe } from "../@types/dtos/api-brasileirao/RodadaDetalhe";
import { Time } from "../models/TimeEntity";
import { Partida } from "../models/PartidaEntity";
import { Rodada } from "../models/RodadaEntity";


export class CampeonatoService implements ICampeonatoService {

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

                await this.campeonatoRepository.save(campeonato);
            }


        } catch (error) {
            throw error;
        }
    }
    private async dadosRodada(idCampeonatoApiExterna: number) {

    }


    private campeonatoFactory(idCampeonatoApi: number, dadosCampeonato: CampeonatoDTO): Campeonato {
        const campeonato = new Campeonato();

        campeonato.id = dadosCampeonato.id;
        campeonato.nome = dadosCampeonato.nome;
        campeonato.slug = dadosCampeonato.slug;
        campeonato.idCampeonatoApiExterna = idCampeonatoApi;

        return campeonato;
    }

    private rodadaFactory = (
        dadosRodada: RodadaDetalhe,
    ): Rodada => {
        const numeroRodada = dadosRodada.rodada;
        const partidas: Partida[] = dadosRodada.partidas.map((partida) => {
            const mandante = new Time();
            partida.time_mandante.time_id = mandante.id;
            partida.time_mandante.nome_popular = mandante.nome;
            partida.time_mandante.sigla = mandante.sigla;
            partida.time_mandante.escudo = mandante.escudo;

            const visitante = new Time()
            partida.time_visitante.time_id = visitante.id;
            partida.time_visitante.nome_popular = visitante.nome;
            partida.time_visitante.sigla = visitante.sigla;
            partida.time_visitante.escudo = visitante.escudo;

            const data = new Date(partida.data_realizacao_iso);
            const id = partida.partida_id;
            const jogo = new Partida();
            jogo.mandante = mandante;
            jogo.visitante = visitante;
            jogo.dataRealizacao = data
            jogo.id = id;
            return jogo;
        });
        const rodada = new Rodada();
        rodada.rodada = numeroRodada;
        rodada.partida = partidas;
        return rodada

    };


}
