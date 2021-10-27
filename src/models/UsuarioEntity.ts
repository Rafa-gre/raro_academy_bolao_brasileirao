import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;
  
  @Column()
  hashSenha: string;
}
