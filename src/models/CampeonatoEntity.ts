import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rodada } from "./RodadaEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Campeonato {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: false })
    nomePopular: string;

    @Column({ nullable: false })
    status: string;

    @Column({ nullable: false })
    logo: string;

    @Column()
    idCampeonatoApiExterna: number;

    @ManyToMany(() => Usuario)
    usuarios: Usuario[];

    @OneToMany(() => Rodada, rodada => rodada.campeonato)
    rodada: Rodada[];
}