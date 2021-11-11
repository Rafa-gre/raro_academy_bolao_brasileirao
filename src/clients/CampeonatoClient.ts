import { Tabela } from "../@types/dtos/api-brasileirao/Tabela";
import { RodadaDetalhe } from "../@types/dtos/api-brasileirao/RodadaDetalhe";
import { RodadaDTO } from "../@types/dtos/api-brasileirao/rodadaDto";
import { HttpClient } from "../@types/infra/http/HttpClient"

export default class APIBrasileirao {
    private API_BRASILEIRAO = `${process.env.BASE_BRASILEIRAO_API}`;
    private BRASILEIRAO_BEARER = `${process.env.BASE_BRASILEIRAO_BEARER}`
    public idCampeonatoApiExterna: number;
    constructor(private readonly httpClient: HttpClient) { }

    public async getTabelaAPI(): Promise<Tabela[]> {
        try {
            const url = `${this.API_BRASILEIRAO}/campeonatos/${this.idCampeonatoApiExterna}/tabela`;
            console.log(url);
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
    public async getRodadaAPI(): Promise<RodadaDTO[]> {
        try {
            const url = `${this.API_BRASILEIRAO}/campeonatos/${this.idCampeonatoApiExterna}/rodadas`;
            console.log(url);
            const rodada = await this.httpClient.get<RodadaDTO[]>(url, {
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