import { PartidaDTO } from "../@types/dtos/api-brasileirao/partidaDTO";
import { TimeRepository } from "../repositories/TimeRepository";
import { Partida } from "../models/PartidaEntity";
import { IPartidaRepository } from "../repositories/IPartidaRepository";
import { TimeService } from "./TimeService";

export class PartidaService {

    constructor(private partidaRepository: IPartidaRepository
    ) { }

    public partidaFactory(dadosPartida: PartidaDTO): Partida {
        const timeRepo = new TimeRepository()
        const timeService = new TimeService(timeRepo);
        const partida = new Partida()
        partida.mandante = timeService.timeFactory(dadosPartida.time_mandante)
        partida.visitante = timeService.timeFactory(dadosPartida.time_visitante)
        partida.dataRealizacao = new Date(dadosPartida.data_realizacao_iso);
        partida.placarMandante = dadosPartida.placar_mandante;
        partida.placarVisitante = dadosPartida.placar_visitante;
        partida.slug = dadosPartida.slug;
        partida.placar = dadosPartida.placar;
        partida.status = dadosPartida.status;
        return partida
    }


}