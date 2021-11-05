import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTime1636145488108 implements MigrationInterface {
    name = 'CreateTime1636145488108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`time\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`sigla\` varchar(255) NOT NULL, \`escudo\` varchar(255) NOT NULL, \`partidaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`time\` ADD CONSTRAINT \`FK_6811f4b88772487b2e83e927778\` FOREIGN KEY (\`partidaId\`) REFERENCES \`partida\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`time\` DROP FOREIGN KEY \`FK_6811f4b88772487b2e83e927778\``);
        await queryRunner.query(`DROP TABLE \`time\``);

    }

}
