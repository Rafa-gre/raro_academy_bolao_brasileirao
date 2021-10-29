import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}