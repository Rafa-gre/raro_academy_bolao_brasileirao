import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Rodada } from "./RodadaEntity";
import { Time } from "./TimeEntity";

@Entity()
export class Partida {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    placar: string;

    @Column({ nullable: true })
    placarMandante: number;

    @Column({ nullable: true })
    placarVisitante: number;

    @Column({ nullable: false })
    status: string;

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: true })
    dataRealizacao: Date;

    @OneToMany(() => Aposta, aposta => aposta.partida)
    apostas: Aposta[];

    @ManyToOne(() => Rodada, rodada => rodada.partidas)
    rodada: Rodada;

    @ManyToOne(() => Time, time => time.partida)
    mandante: Time;

    @ManyToOne(() => Time, time => time.partida)
    visitante: Time;

}