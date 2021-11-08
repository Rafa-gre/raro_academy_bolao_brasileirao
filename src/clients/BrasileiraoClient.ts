import { Tabela } from "../@types/dtos/api-brasileirao/Tabela";
import { RodadaDetalhe } from "../@types/dtos/api-brasileirao/RodadaDetalhe";
import { Rodada } from "../@types/dtos/api-brasileirao/Rodada";
import { HttpClient } from "../@types/infra/http/HttpClient"

export default class APIBrasileirao {
    private API_BRASILEIRAO = `${process.env.BASE_BRASILEIRAO_API}`;
    private BRASILEIRAO_BEARER = `${process.env.BASE_BRASILEIRAO_BEARER}`
    private idCampeonatoApiExterna: number;
    constructor(private readonly httpClient: HttpClient) { }

    public async getTabelaAPI(): Promise<Tabela[]> {
        try {
            this.idCampeonatoApiExterna = 10;
            const url = `${this.API_BRASILEIRAO}/campeonatos/${this.idCampeonatoApiExterna}/tabela`;
            const campeonato = await this.httpClient.get<Tabela[]>(url, {
                headers: { Authorization: this.BRASILEIRAO_BEARER },
            });
            return campeonato.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Falha ao consultar a tabela do Brasileirão. Motivo: ${error.message}`
                );
            } else {
                throw error;
            }
        }
    }
    public async getRodadaAPI(): Promise<Rodada[]> {
        try {
            this.idCampeonatoApiExterna = 10;
            const url = `${this.API_BRASILEIRAO}/campeonatos/${this.idCampeonatoApiExterna}/rodada`;
            const rodada = await this.httpClient.get<Rodada[]>(url, {
                headers: { Authorization: this.BRASILEIRAO_BEARER },
            });
            return rodada.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Falha ao consultar as rodadas do Brasileirão. Motivo: ${error.message}`
                );
            } else {
                throw error;
            }
        }
    }
    public async getRodadaDetalhesAPI(
        numeroRodada: number
    ): Promise<RodadaDetalhe> {
        try {
            this.idCampeonatoApiExterna = 10;
            const url = `${this.API_BRASILEIRAO}/campeonatos/${this.idCampeonatoApiExterna}/rodadas/${numeroRodada.toString()}`;
            const rodadaDetail = await this.httpClient.get<RodadaDetalhe>(url, {
                headers: { Authorization: this.BRASILEIRAO_BEARER },
            });
            return rodadaDetail.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Falha ao consultar os detalhes das rodadas do Brasileirão. Motivo: ${error.message}`
                );
            } else {
                throw error;
            }
        }
    }
}