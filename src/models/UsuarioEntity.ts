import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Campeonato } from "./CampeonatoEntity";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashSenha: string;

  @OneToOne(() => Usuario, usuario => usuario.endereco)
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => Aposta, aposta => aposta.usuario)
  apostas: Aposta[];

  @ManyToMany(() => Campeonato, { cascade: true })
  @JoinTable()
  campeonatos: Campeonato[];
}
