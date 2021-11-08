export interface Rodada {
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
  _link: string;
};