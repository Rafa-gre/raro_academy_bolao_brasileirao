import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./TimeEntity";

@Entity()
export class Partida {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    placar: string;

    @Column({ nullable: false })
    mandante: Time

    @Column({ nullable: false })
    visitante: Time

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
}