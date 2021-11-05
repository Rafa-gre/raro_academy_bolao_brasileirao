import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCampeonato1636144987798 implements MigrationInterface {
    name = 'CreateCampeonato1636144987798'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE \`campeonato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`nomePopular\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`idCampeonatoApiExterna\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE \`campeonato\``);

    }

}
