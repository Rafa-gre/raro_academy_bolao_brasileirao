import { TimeService } from "../service/TimeService";
import { Connection } from "typeorm";
import { TimeRepository } from "../repositories/TimeRepository";



export const criarTime = async (connection: Connection) => {
    const timeRepo = connection.getCustomRepository(TimeRepository);
    const timeService = new TimeService(timeRepo);


    const result = await timeService.criar(connection);
    console.log('========= result', result);
}