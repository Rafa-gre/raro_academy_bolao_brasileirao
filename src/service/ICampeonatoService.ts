import { CampeonatoDTO } from "../@types/dtos/campeonatoDto";





export interface ICampeonatoService {
    criar(idCampeonatoApiExterna: number): Promise<CampeonatoDTO>;
    /*     autenticar(dadosCampeonato: AutenticaCampeonatoDTO): Promise<RetornoAutenticacao>;
        alterar(CampeonatoId: number, CampeonatoDTO: AlterarCampeonatoDTO): Promise<void>;
        alterarSenha(Campeonatoid: number, senhaAntiga: string, novaSenha: string): Promise<void>;
        inativar(CampeonatoId: number): Promise<void> */
}