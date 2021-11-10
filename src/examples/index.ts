import { Connection } from 'typeorm';
import {
  criaUsuario,
  autenticaUsuario,
  alteraUsuario,
  alteraSenha
} from './UsuarioExample';
import { buscaEnderecoPeloCep } from './EnderecoExample';
import { buscarCampeonato, criarCampeonato } from '../examples/CampeonatoExample';

export const runner = async (connection: Connection) => {
  // await buscaEnderecoPeloCep();
  await criarCampeonato(connection);
  await buscarCampeonato(connection);
  // await criaUsuario(connection);
  // await autenticaUsuario(connection);
  // await alteraUsuario(connection);
  // await alteraSenha(connection);
};