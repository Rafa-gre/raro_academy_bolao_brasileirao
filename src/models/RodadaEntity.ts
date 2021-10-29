import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

}