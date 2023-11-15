<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231114181811 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intento ADD fecha_hora_inicio DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE pregunta CHANGE enunciado enunciado VARCHAR(100) NOT NULL, CHANGE opc1 opc1 VARCHAR(100) NOT NULL, CHANGE opc2 opc2 VARCHAR(100) NOT NULL, CHANGE opc3 opc3 VARCHAR(100) NOT NULL, CHANGE url url VARCHAR(100) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intento DROP fecha_hora_inicio');
        $this->addSql('ALTER TABLE pregunta CHANGE enunciado enunciado VARCHAR(500) NOT NULL, CHANGE opc1 opc1 VARCHAR(500) NOT NULL, CHANGE opc2 opc2 VARCHAR(500) NOT NULL, CHANGE opc3 opc3 VARCHAR(500) NOT NULL, CHANGE url url LONGTEXT DEFAULT NULL');
    }
}
