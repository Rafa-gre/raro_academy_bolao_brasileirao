
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./UsuarioEntity";


@Entity()
export class Endereco {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false })
  logradouro: string;

  @Column({ nullable: false })
  complemento: string;

  @Column({ nullable: false })
  numero: string;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  estado: string;

  @OneToOne(() => Usuario, usuario => usuario.endereco)
  @JoinColumn()
  usuario: Usuario;
}
