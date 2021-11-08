import { Time } from "../api-brasileirao/Time"

export interface Tabela {
    posicao: number;
    pontos: number;
    time: Time;
    jogos: number;
    vitorias: number;
    empates: number;
    derrotas: number;
    gols_pro: number;
    gols_contra: number;
    saldo_gols: number;
    aproveitamento: number;
    variacao_posicao: number;
    ultimos_jogos: string[];
};