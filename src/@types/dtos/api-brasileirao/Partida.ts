import { Time } from "../api-brasileirao/Time"

export type Partida = {
    partida_id: number;
    campeonato: {
        campeonato_id: number;
        nome: string;
        slug: string;
    };
    placar: string;
    time_mandante: Time;
    time_visitante: Time;
    placar_mandante: 2;
    placar_visitante: 2;
    status: string;
    slug: string;
    data_realizacao: string;
    hora_realizacao: string;
    data_realizacao_iso: string;
    estadio: {
        estadio_id: number;
        nome_popular: string;
    };
    _link: string;
};