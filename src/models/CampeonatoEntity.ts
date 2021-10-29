import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}