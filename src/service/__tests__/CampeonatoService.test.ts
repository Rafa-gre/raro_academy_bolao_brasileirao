
import { RodadaRepository } from '../../repositories/RodadaRepository';
import { CampeonatoDTO } from '../../@types/dtos/campeonatoDto';
import { Campeonato } from '../../models/CampeonatoEntity';
import { CampeonatoRepository } from '../../repositories/CampeonatoRepository';
import { CampeonatoService } from '../../service/CampeonatoService';
import CampeonatoClient from '../../clients/CampeonatoClient';
import { AxiosHttpClient } from "../../infra/http/AxiosHttpClient";


describe('CampeonatoService', () => {
    let campeonatoDto: CampeonatoDTO;
    let campeonatoRepository: CampeonatoRepository;
    let campeonatoService: CampeonatoService;
    let rodadaRepository: RodadaRepository;
    const oldEnv = process.env;

    afterEach(() => {
        process.env = oldEnv;
    });

    beforeEach(jest.clearAllMocks);
    beforeEach(() => {

        campeonatoRepository = new CampeonatoRepository();
        rodadaRepository = new RodadaRepository();
        campeonatoService = new CampeonatoService(campeonatoRepository);
        const httpClient = new AxiosHttpClient();
        const campeonatoClient = new CampeonatoClient(httpClient);
        process.env.BASE_BRASILEIRAO_API = "https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1";
        process.env.BASE_BRASILEIRAO_BEARER = "bearer d44db0cc0676316ee1248780ec04da734e0f06a77c30aaf9a2dcbb1899093361"


    });

    describe('criarCampeonato', () => {
        it('deve criar um novo campeonato com sucesso', async () => {
            campeonatoDto = {

                idCampeonatoApiExterna: 10,
            };

            jest.spyOn(campeonatoRepository, 'save').mockResolvedValue(new Campeonato());
            await campeonatoService.criar(campeonatoDto.idCampeonatoApiExterna);

            const expectedCampeonatoDto = campeonatoDto;
            (expectedCampeonatoDto as Campeonato).idCampeonatoApiExterna = expect.any(Number)
            expect(campeonatoRepository.save).toHaveBeenCalledWith(expectedCampeonatoDto);
            expect(campeonatoRepository.save).not.toHaveBeenCalledWith(undefined);
            expect(campeonatoRepository.save).not.toHaveBeenCalledWith(null)
        });


        it('deve lançar os demais tipos de erros conforme são criados', async () => {
            const rejectionError = new Error('any error thrown');
            jest.spyOn(campeonatoRepository, 'save').mockRejectedValue(rejectionError);
            await expect(campeonatoService.criar(campeonatoDto.idCampeonatoApiExterna))
                .rejects
                .toThrow(rejectionError);
        });
    });
    describe('buscarCampeonatoApi', () => {
        it('deve buscar os dados da API e atualizar o campeonato com sucesso', async () => {
            campeonatoDto = {
                idCampeonatoApiExterna: 10,
                nome: "Campeonato Brasileiro",
                slug: "campeonato-brasileiro",
                nomePopular: "-",
                status: "ativo",
                logo: "-"
            };

            jest.spyOn(campeonatoRepository, 'findById').mockResolvedValue(campeonatoDto as Campeonato)
            jest.spyOn(campeonatoRepository, 'save').mockResolvedValue(new Campeonato());

            await campeonatoService.buscarCampeonatoApi(campeonatoDto.idCampeonatoApiExterna);

            const expectedCampeonatoDto = campeonatoDto;
            (expectedCampeonatoDto as Campeonato).idCampeonatoApiExterna = expect.any(Number);
            (expectedCampeonatoDto as Campeonato).nome = expect.stringMatching("Campeonato Brasileiro");
            (expectedCampeonatoDto as Campeonato).slug = expect.stringMatching("campeonato-brasileiro");
            (expectedCampeonatoDto as Campeonato).nomePopular = expect.stringMatching("-");
            (expectedCampeonatoDto as Campeonato).status = expect.stringMatching("ativo");
            (expectedCampeonatoDto as Campeonato).logo = expect.stringMatching("-");
            expect(campeonatoRepository.save).toHaveBeenCalledWith(expectedCampeonatoDto);
            expect(campeonatoRepository.save).not.toHaveBeenCalledWith(undefined);
            expect(campeonatoRepository.save).not.toHaveBeenCalledWith(null)
        });


        it('deve lançar os demais tipos de erros conforme são criados', async () => {
            const rejectionError = new Error();
            jest.spyOn(campeonatoRepository, 'save').mockRejectedValue(rejectionError);
            await expect(campeonatoService.buscarCampeonatoApi(campeonatoDto.idCampeonatoApiExterna))
                .rejects
                .toThrow(Error);
        });
    });
});