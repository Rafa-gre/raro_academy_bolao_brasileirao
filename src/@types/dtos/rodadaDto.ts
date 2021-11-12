import { PartidaDTO } from "./api-brasileirao/partidaDTO";


export interface RodadaDTO {
    numeroRodada: number;
    jogos: PartidaDTO[];
    dataHora: string;
};