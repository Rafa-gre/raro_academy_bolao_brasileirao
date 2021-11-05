import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEndereco1636145118422 implements MigrationInterface {
    name = 'CreateEndereco1636145118422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`endereco\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cep\` varchar(255) NOT NULL, \`logradouro\` varchar(255) NOT NULL, \`complemento\` varchar(255) NOT NULL, \`numero\` varchar(255) NOT NULL, \`bairro\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_82bec04bb9fadadad0a33cb0c4\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_82bec04bb9fadadad0a33cb0c43\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_82bec04bb9fadadad0a33cb0c43\``);
        await queryRunner.query(`DROP INDEX \`REL_82bec04bb9fadadad0a33cb0c4\` ON \`endereco\``);
        await queryRunner.query(`DROP TABLE \`endereco\``);
    }

}
