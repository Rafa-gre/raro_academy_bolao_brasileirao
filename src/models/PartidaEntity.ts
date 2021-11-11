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

    @Column({ nullable: false })
    placarMandante: number;

    @Column({ nullable: false })
    placarVisitante: number;

    @Column({ nullable: false })
    status: string;

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: false })
    dataRealizacao: Date;

    @OneToMany(() => Aposta, aposta => aposta.partida)
    apostas: Aposta[];

    @ManyToOne(() => Rodada, rodada => rodada.partida)
    rodada: Rodada;

    @OneToMany(() => Time, time => time.partida)
    mandante: Time;

    @OneToMany(() => Time, time => time.partida)
    visitante: Time;

}