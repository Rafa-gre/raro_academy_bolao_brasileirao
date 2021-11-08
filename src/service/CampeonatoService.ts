import { CampeonatoDTO } from "../@types/dtos/campeonatoDto";
import { ICampeonatoRepository } from "repositories/ICampeonatoRepository";
import { ICampeonatoService } from "./ICampeonatoService";
import { Campeonato } from "models/CampeonatoEntity";

export class CampeonatoService implements ICampeonatoService {
    public static TEMPO_PARA_EXPIRACAO_DE_TOKEN = '6 hours';
    constructor(private campeonatoRepository: ICampeonatoRepository) { }

    async criar(dadosCampeonato: CampeonatoDTO): Promise<CampeonatoDTO> {
        try {
            const Campeonato = this.campeonatoFactory(dadosCampeonato);
            const resultado = await this.campeonatoRepository.save(Campeonato);
            return resultado;
        } catch (error) {

            throw error;
        }
    }

    private campeonatoFactory(dadosCampeonato: CampeonatoDTO): Campeonato {
        const campeonato = new Campeonato();

        campeonato.id = dadosCampeonato.id;
        campeonato.nome = dadosCampeonato.nome;
        campeonato.slug = dadosCampeonato.slug;
        campeonato.id = dadosCampeonato.id;
        campeonato.idCampeonatoApiExterna = dadosCampeonato.idCampeonatoApiExterna;

        return campeonato;
    }
}