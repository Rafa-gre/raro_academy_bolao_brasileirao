import { Partida } from "../api-brasileirao/Partida";

export interface RodadaDetalhe {
    nome: string;
    slug: string;
    rodada: number;
    status: string;
    proxima_rodada: {
        nome: string;
        slug: string;
        rodada: number;
        status: string;
    };
    rodada_anterior: number;
    partidas: Partida[];
};