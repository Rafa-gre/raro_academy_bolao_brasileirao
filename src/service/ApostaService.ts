
import { IApostaRepository } from "../repositories/IApostaRepository";
import { RodadaRepository } from "../repositories/RodadaRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { Connection } from "typeorm";
import { PalpiteDTO } from "../@types/dtos/palpiteDto";
import { Aposta } from "../models/ApostaEntity";



export class ApostaService {

    constructor(private ApostaRepository: IApostaRepository
    ) { }

    async criar(usuarioId: number, rodada: number, palpites: PalpiteDTO[], connection: Connection): Promise<void> {
        try {
            const usuariosRepository = connection.getCustomRepository(UsuarioRepository);
            const usuario = await usuariosRepository.findById(usuarioId);
            const rodadasRepository = connection.getCustomRepository(RodadaRepository);
            const rodadaData = await rodadasRepository.findByNumeroRodada(rodada);

            palpites.map(async (palpite) => {
                const partida = rodadaData.partidas.find(partida => partida.id === palpite.jogoId);
                const aposta = new Aposta();
                aposta.partida = partida;
                aposta.placarMandante = palpite.golsMandante;
                aposta.placarVisitante = palpite.golsVisitante;
                aposta.usuario = usuario;
                return await this.ApostaRepository.save(aposta);
            });

        } catch (error) {

            throw error;
        }
    }


}