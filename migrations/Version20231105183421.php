<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231105183421 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE examen ADD categoria_id INT DEFAULT NULL, ADD dificultad_id INT DEFAULT NULL, ADD tipo VARCHAR(20) NOT NULL');
        $this->addSql('ALTER TABLE examen ADD CONSTRAINT FK_514C8FEC3397707A FOREIGN KEY (categoria_id) REFERENCES categoria (id)');
        $this->addSql('ALTER TABLE examen ADD CONSTRAINT FK_514C8FEC35BBBA4A FOREIGN KEY (dificultad_id) REFERENCES dificultad (id)');
        $this->addSql('CREATE INDEX IDX_514C8FEC3397707A ON examen (categoria_id)');
        $this->addSql('CREATE INDEX IDX_514C8FEC35BBBA4A ON examen (dificultad_id)');
        $this->addSql('ALTER TABLE usuario CHANGE roles roles JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', CHANGE is_verified is_verified TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE examen DROP FOREIGN KEY FK_514C8FEC3397707A');
        $this->addSql('ALTER TABLE examen DROP FOREIGN KEY FK_514C8FEC35BBBA4A');
        $this->addSql('DROP INDEX IDX_514C8FEC3397707A ON examen');
        $this->addSql('DROP INDEX IDX_514C8FEC35BBBA4A ON examen');
        $this->addSql('ALTER TABLE examen DROP categoria_id, DROP dificultad_id, DROP tipo');
        $this->addSql('ALTER TABLE usuario CHANGE roles roles JSON NOT NULL COMMENT \'(DC2Type:json)\', CHANGE is_verified is_verified TINYINT(1) NOT NULL');
    }
}
