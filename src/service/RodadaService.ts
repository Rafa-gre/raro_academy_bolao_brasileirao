import CampeonatoClient from "../clients/CampeonatoClient";
import { AxiosHttpClient } from "../infra/http/AxiosHttpClient";
import { RodadaDTO } from "../@types/dtos/api-brasileirao/rodadaDto";
import { Rodada } from "../models/RodadaEntity";
import { IRodadaRepository } from "../repositories/IRodadaRepository";
import { Connection } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";
import { RodadaDetalhe } from "../@types/dtos/api-brasileirao/RodadaDetalhe";
import { PartidaService } from "./PartidaService";
import { PartidaRepository } from "../repositories/PartidaRepository";
import { PartidaDTO } from "../@types/dtos/api-brasileirao/partidaDTO";

export class RodadaService {

    constructor(private rodadaRepository: IRodadaRepository
    ) { }

    async criar(connection: Connection): Promise<void> {
        const httpClient = new AxiosHttpClient();
        const campeonatoClient = new CampeonatoClient(httpClient);
        const partidaRepository = new PartidaRepository()
        const partidaService = new PartidaService(partidaRepository);
        const campeonatoRepo = connection.getRepository(Campeonato);
        const campeonatoDb = await campeonatoRepo.findOne({ where: { status: "ativo" } })
        campeonatoClient.idCampeonatoApiExterna = campeonatoDb.idCampeonatoApiExterna;
        const rodadas = await campeonatoClient.getRodadaAPI();
        const detalhesPromises = rodadas.map((rodada: RodadaDTO) => {
            return campeonatoClient.getRodadaDetalhesAPI(rodada.rodada)
        })
        const detalhes: RodadaDetalhe[] = await Promise.all(detalhesPromises);
        const rodadasDetalheRepo = detalhes.map(async (rodada: RodadaDetalhe) => {
            const rodadaDb = await this.rodadaRepository.findByNumeroRodada(rodada.rodada);
            if (!rodadaDb) {
                return this.rodadaRepository.save(this.rodadaFactory(rodada, campeonatoDb));
            } else {

                rodadaDb.nome = rodada.nome;
                rodadaDb.slug = rodada.slug;
                rodadaDb.rodada = rodada.rodada;
                rodadaDb.status = rodada.status;
                rodadaDb.campeonato = campeonatoDb;
                rodadaDb.partidas = await Promise.all(rodada.partidas.map(async (partida: PartidaDTO) => {
                    return await partidaService.partidaUpdate(partida, connection)

                }))


                return this.rodadaRepository.save(rodadaDb);

            }
        });


        await Promise.all(rodadasDetalheRepo)
    };

    private rodadaFactory(dadosRodada: RodadaDetalhe, campeonato: Campeonato): Rodada {
        const partidaRepository = new PartidaRepository()
        const partidaService = new PartidaService(partidaRepository);
        const rodada = new Rodada();
        rodada.nome = dadosRodada.nome;
        rodada.slug = dadosRodada.slug;
        rodada.rodada = dadosRodada.rodada;
        rodada.status = dadosRodada.status;
        rodada.campeonato = campeonato;
        rodada.partidas = dadosRodada.partidas.map((partida: PartidaDTO) => {
            return partidaService.partidaFactory(partida)
        })
        return rodada
    }
}


