import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { runner } from '../src/examples';
import { CampeonatoService } from './service/CampeonatoService'
import { ICampeonatoRepository } from './repositories/ICampeonatoRepository';
import { CampeonatoRepository } from './repositories/CampeonatoRepository';

dotenv.config();

export const start = async () => {
  try {
    const connection = await createConnection();
    await runner(connection);

    process.exit(0);
  } catch (error: unknown) {
    console.log(error);
    process.exit(1);
  }
};

start();