import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rodada } from "./RodadaEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Campeonato {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: "Campeonato" })
  nome: string;

  @Column({ nullable: false, default: "-" })
  slug: string;

  @Column({ default: "-" })
  nomePopular: string;

  @Column({ default: "-" })
  status: string;

  @Column({ nullable: false, default: "-" })
  logo: string;

  @Column()
  idCampeonatoApiExterna: number;

  @ManyToMany(() => Usuario)
  usuarios: Usuario[];

  @OneToMany(() => Rodada, rodada => rodada.campeonato)
  rodada: Rodada[];
}