import CampeonatoClient from "../clients/CampeonatoClient";
import { AxiosHttpClient } from "../infra/http/AxiosHttpClient";
import { RodadaDTO } from "../@types/dtos/api-brasileirao/rodadaDto";
import { Rodada } from "../models/RodadaEntity";
import { IRodadaRepository } from "../repositories/IRodadaRepository";
import { Connection } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";

export class RodadaService {

    constructor(private rodadaRepository: IRodadaRepository
    ) { }

    async criar(connection: Connection): Promise<void> {
        const httpClient = new AxiosHttpClient();
        const campeonatoClient = new CampeonatoClient(httpClient);
        const campeonatoRepo = connection.getRepository(Campeonato);
        const campeonatoDb = await campeonatoRepo.findOne({ where: { status: "ativo" } })
        campeonatoClient.idCampeonatoApiExterna = campeonatoDb.idCampeonatoApiExterna;
        const rodadas = await campeonatoClient.getRodadaAPI();
        const rodadasRepo = rodadas.map(async (rodada: RodadaDTO) => {
            const rodadaDb = await this.rodadaRepository.findByNumeroRodada(rodada.rodada);
            console.log(rodadaDb);
            if (!rodadaDb) {
                return this.rodadaRepository.save(this.rodadaFactory(rodada, campeonatoDb));
            } else {

                rodadaDb.nome = rodada.nome;
                rodadaDb.slug = rodada.slug;
                rodadaDb.rodada = rodada.rodada;
                rodadaDb.status = rodada.status;
                rodadaDb.campeonato = campeonatoDb;

                return this.rodadaRepository.save(rodadaDb);
            }
        });


        await Promise.all(rodadasRepo)
    };

    private rodadaFactory(dadosRodada: RodadaDTO, campeonato: Campeonato): Rodada {
        const rodada = new Rodada();
        rodada.nome = dadosRodada.nome;
        rodada.slug = dadosRodada.slug;
        rodada.rodada = dadosRodada.rodada;
        rodada.status = dadosRodada.status;
        rodada.campeonato = campeonato;
        return rodada
    }


}