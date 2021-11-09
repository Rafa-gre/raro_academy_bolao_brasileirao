
import { CampeonatoDTO } from '../../@types/dtos/campeonatoDto';
import { Campeonato } from '../../models/CampeonatoEntity';
import { CampeonatoRepository } from '../../repositories/CampeonatoRepository';
import { CampeonatoService } from '../../service/CampeonatoService';


describe('UsuarioService', () => {
    let campeonatoDto: CampeonatoDTO;
    let campeonatoRepository: CampeonatoRepository;
    let campeonatoService: CampeonatoService;

    const oldEnv = process.env;

    afterEach(() => {
        process.env = oldEnv;
    });

    beforeEach(jest.clearAllMocks);
    beforeEach(() => {
        campeonatoDto = {
            nome: "Campeonato Brasileiro",
            slug: "campeonato_brasileiro",
            idCampeonatoApiExterna: 10,
        };
        campeonatoRepository = new CampeonatoRepository();
        campeonatoService = new CampeonatoService(campeonatoRepository);

    });

    describe('criarCampeonato', () => {
        it('deve criar um novo campeonato com sucesso', async () => {
            jest.spyOn(campeonatoRepository, 'save').mockResolvedValue(new Campeonato());
            await campeonatoService.criar(campeonatoDto);

            const expectedCampeonatoDto = campeonatoDto;
            (expectedCampeonatoDto as Campeonato).idCampeonatoApiExterna = expect.any(Number)
            expect(campeonatoRepository.save).toHaveBeenCalledWith(expectedCampeonatoDto);
            expect(campeonatoRepository.save).not.toHaveBeenCalledWith(undefined);
            expect(campeonatoRepository.save).not.toHaveBeenCalledWith(null)
        });


        it('deve lançar os demais tipos de erros conforme são criados', async () => {
            const rejectionError = new Error('any error thrown');
            jest.spyOn(campeonatoRepository, 'save').mockRejectedValue(rejectionError);
            await expect(campeonatoService.criar(campeonatoDto))
                .rejects
                .toThrow(rejectionError);
        });
    });
});