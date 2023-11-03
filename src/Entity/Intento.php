<?php

namespace App\Entity;

use App\Repository\IntentoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IntentoRepository::class)]
class Intento
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $Fecha = null;

    #[ORM\Column]
    private array $JSONRespuestas = [];

    #[ORM\Column]
    private ?float $Calificacion = null;

    #[ORM\ManyToOne(inversedBy: 'intentos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $idAlumno = null;

    #[ORM\ManyToOne(inversedBy: 'intentos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Examen $idExamen = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->Fecha;
    }

    public function setFecha(\DateTimeInterface $Fecha): static
    {
        $this->Fecha = $Fecha;

        return $this;
    }

    public function getJSONRespuestas(): array
    {
        return $this->JSONRespuestas;
    }

    public function setJSONRespuestas(array $JSONRespuestas): static
    {
        $this->JSONRespuestas = $JSONRespuestas;

        return $this;
    }

    public function getCalificacion(): ?float
    {
        return $this->Calificacion;
    }

    public function setCalificacion(float $Calificacion): static
    {
        $this->Calificacion = $Calificacion;

        return $this;
    }

    public function getIdAlumno(): ?Usuario
    {
        return $this->idAlumno;
    }

    public function setIdAlumno(?Usuario $idAlumno): static
    {
        $this->idAlumno = $idAlumno;

        return $this;
    }

    public function getIdExamen(): ?Examen
    {
        return $this->idExamen;
    }

    public function setIdExamen(?Examen $idExamen): static
    {
        $this->idExamen = $idExamen;

        return $this;
    }
}
