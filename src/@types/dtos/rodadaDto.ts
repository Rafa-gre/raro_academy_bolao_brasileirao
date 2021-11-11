import { Partida } from "./api-brasileirao/Partida";


export interface RodadaDTO {
    numeroRodada: number;
    jogos: Partida[];
    dataHora: string;
};