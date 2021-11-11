import { Connection } from 'typeorm';
import {
  criaUsuario,
  autenticaUsuario,
  alteraUsuario,
  alteraSenha
} from './UsuarioExample';
import { buscaEnderecoPeloCep } from './EnderecoExample';
import { buscarCampeonato, criarCampeonato } from '../examples/CampeonatoExample';
import { criarTime } from './TimeExample';
import { criarRodada } from './RodadaExample';

export const runner = async (connection: Connection) => {
  // await buscaEnderecoPeloCep();
  //await criarCampeonato(connection);
  //await buscarCampeonato(connection);
  //await criarTime(connection)
  await criarRodada(connection)
  // await criaUsuario(connection);
  // await autenticaUsuario(connection);
  // await alteraUsuario(connection);
  // await alteraSenha(connection);
};