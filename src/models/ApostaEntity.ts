import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Aposta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuarioId: number;

    @Column()
    partidaId: number;

    @Column({ nullable: false })
    placarMandante: number;

    @Column({ nullable: false })
    placarVisitante: number;
}