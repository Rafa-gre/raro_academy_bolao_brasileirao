import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Partida } from "./PartidaEntity";


@Entity()
export class Time {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: false })
    sigla: string;

    @Column({ nullable: false })
    escudo: string;


    @ManyToOne(() => Partida, partida => partida.apostas)

    partida: Partida;

    @OneToMany(() => Partida, partida => partida.times)

    partidasMandante: Partida[];

    @OneToMany(() => Partida, partida => partida.times)

    partidasVisitante: Partida[];




}