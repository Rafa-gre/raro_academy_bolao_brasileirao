
import CampeonatoClient from "../clients/CampeonatoClient";
import { AxiosHttpClient } from "../infra/http/AxiosHttpClient";
import { TimeDTO } from "../@types/dtos/timeDto";
import { Time } from "../models/TimeEntity";
import { ITimeRepository } from "../repositories/ITimeRepository";
import { Connection } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";

export class TimeService {

    constructor(private timeRepository: ITimeRepository
    ) { }

    async criar(connection: Connection): Promise<Time[]> {
        const httpClient = new AxiosHttpClient();
        const campeonatoClient = new CampeonatoClient(httpClient);
        const campeonatoRepo = connection.getRepository(Campeonato);
        campeonatoClient.idCampeonatoApiExterna = (await campeonatoRepo.findOne({ where: { status: "ativo" } })).idCampeonatoApiExterna;
        const timesApi = await campeonatoClient.getTabelaAPI();
        const times = timesApi.map(posicao => { return posicao.time });
        const timesRepo = times.map(async (time: TimeDTO) => {
            if (!this.timeRepository.findById(time.time_id)) {
                return this.timeRepository.save(this.timeFactory(time));
            } else {
                const timeRepo = await this.timeRepository.findById(time.time_id);
                timeRepo.nome = time.nome_popular;
                timeRepo.sigla = time.sigla;
                timeRepo.escudo = time.escudo;
                return this.timeRepository.save(timeRepo);
            }
        });

        console.log(timesRepo)
        return Promise.all(timesRepo)
    };

    private timeFactory(dadosTime: TimeDTO): Time {
        const time = new Time();
        time.id = dadosTime.time_id
        time.nome = dadosTime.nome_popular;
        time.sigla = dadosTime.sigla;
        time.escudo = dadosTime.escudo;
        return time;
    }

}