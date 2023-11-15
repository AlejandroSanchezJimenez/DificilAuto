<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231114183343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intento CHANGE id_alumno_id id_alumno_id INT DEFAULT NULL, CHANGE id_examen_id id_examen_id INT DEFAULT NULL, CHANGE fecha fecha DATETIME DEFAULT NULL, CHANGE jsonrespuestas jsonrespuestas JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', CHANGE calificacion calificacion DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE pregunta CHANGE enunciado enunciado VARCHAR(100) NOT NULL, CHANGE opc1 opc1 VARCHAR(100) NOT NULL, CHANGE opc2 opc2 VARCHAR(100) NOT NULL, CHANGE opc3 opc3 VARCHAR(100) NOT NULL, CHANGE url url VARCHAR(100) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE intento CHANGE id_alumno_id id_alumno_id INT NOT NULL, CHANGE id_examen_id id_examen_id INT NOT NULL, CHANGE fecha fecha DATETIME NOT NULL, CHANGE jsonrespuestas jsonrespuestas JSON NOT NULL COMMENT \'(DC2Type:json)\', CHANGE calificacion calificacion DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE pregunta CHANGE enunciado enunciado VARCHAR(500) NOT NULL, CHANGE opc1 opc1 VARCHAR(500) NOT NULL, CHANGE opc2 opc2 VARCHAR(500) NOT NULL, CHANGE opc3 opc3 VARCHAR(500) NOT NULL, CHANGE url url LONGTEXT DEFAULT NULL');
    }
}
