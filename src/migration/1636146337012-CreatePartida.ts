import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePartida1636146337012 implements MigrationInterface {
    name = 'CreatePartida1636146337012'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`rodadaId\` \`rodadaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`mandanteId\` \`mandanteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`visitanteId\` \`visitanteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_ed33f0276339f0973c6559d247d\` FOREIGN KEY (\`rodadaId\`) REFERENCES \`rodada\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_3f47fd4c3ccc1dfbd37ffa89aa0\` FOREIGN KEY (\`mandanteId\`) REFERENCES \`time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_73d8623d724d2921ed5a3620a55\` FOREIGN KEY (\`visitanteId\`) REFERENCES \`time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_73d8623d724d2921ed5a3620a55\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_3f47fd4c3ccc1dfbd37ffa89aa0\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_ed33f0276339f0973c6559d247d\``);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`visitanteId\` \`visitanteId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`mandanteId\` \`mandanteId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`rodadaId\` \`rodadaId\` int NULL DEFAULT 'NULL'`);

    }

}
