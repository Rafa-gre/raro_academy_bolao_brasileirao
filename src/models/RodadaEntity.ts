import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Campeonato } from "./CampeonatoEntity";
import { Partida } from "./PartidaEntity";


@Entity()
export class Rodada {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: false })
    rodada: number;

    @Column({ nullable: false })
    status: string;

    @ManyToOne(() => Campeonato, campeonato => campeonato.rodada)

    campeonato: Campeonato;

    @OneToMany(() => Partida, partida => partida.rodada)
    partida: Partida[];

}