<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231105185104 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE examen_usuario (examen_id INT NOT NULL, usuario_id INT NOT NULL, INDEX IDX_81E5D7795C8659A (examen_id), INDEX IDX_81E5D779DB38439E (usuario_id), PRIMARY KEY(examen_id, usuario_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE examen_usuario ADD CONSTRAINT FK_81E5D7795C8659A FOREIGN KEY (examen_id) REFERENCES examen (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE examen_usuario ADD CONSTRAINT FK_81E5D779DB38439E FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE examen_usuario DROP FOREIGN KEY FK_81E5D7795C8659A');
        $this->addSql('ALTER TABLE examen_usuario DROP FOREIGN KEY FK_81E5D779DB38439E');
        $this->addSql('DROP TABLE examen_usuario');
    }
}
