<?php

namespace App\Entity;

use App\Repository\ExamenRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExamenRepository::class)]
class Examen
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $FechaHoraCreacion = null;

    #[ORM\ManyToMany(targetEntity: Pregunta::class, inversedBy: 'examens')]
    private Collection $idPreguntas;

    #[ORM\OneToMany(mappedBy: 'idExamen', targetEntity: Intento::class, orphanRemoval: true)]
    private Collection $intentos;

    #[ORM\Column(length: 20)]
    private ?string $Tipo = null;

    #[ORM\ManyToOne(inversedBy: 'examens')]
    private ?Categoria $Categoria = null;

    #[ORM\ManyToOne(inversedBy: 'examens')]
    private ?Dificultad $Dificultad = null;

    public function __construct()
    {
        $this->idPreguntas = new ArrayCollection();
        $this->intentos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFechaHoraCreacion(): ?\DateTimeInterface
    {
        return $this->FechaHoraCreacion;
    }

    public function setFechaHoraCreacion(\DateTimeInterface $FechaHoraCreacion): static
    {
        $this->FechaHoraCreacion = $FechaHoraCreacion;

        return $this;
    }

    /**
     * @return Collection<int, Pregunta>
     */
    public function getIdPreguntas(): Collection
    {
        return $this->idPreguntas;
    }

    public function addIdPregunta(Pregunta $idPregunta): static
    {
        if (!$this->idPreguntas->contains($idPregunta)) {
            $this->idPreguntas->add($idPregunta);
        }

        return $this;
    }

    public function removeIdPregunta(Pregunta $idPregunta): static
    {
        $this->idPreguntas->removeElement($idPregunta);

        return $this;
    }

    /**
     * @return Collection<int, Intento>
     */
    public function getIntentos(): Collection
    {
        return $this->intentos;
    }

    public function addIntento(Intento $intento): static
    {
        if (!$this->intentos->contains($intento)) {
            $this->intentos->add($intento);
            $intento->setIdExamen($this);
        }

        return $this;
    }

    public function removeIntento(Intento $intento): static
    {
        if ($this->intentos->removeElement($intento)) {
            // set the owning side to null (unless already changed)
            if ($intento->getIdExamen() === $this) {
                $intento->setIdExamen(null);
            }
        }

        return $this;
    }

    public function getCategoria(): ?Categoria
    {
        return $this->Categoria;
    }

    public function setCategoria(?Categoria $Categoria): static
    {
        $this->Categoria = $Categoria;

        return $this;
    }

    public function getDificultad(): ?Dificultad
    {
        return $this->Dificultad;
    }

    public function setDificultad(?Dificultad $Dificultad): static
    {
        $this->Dificultad = $Dificultad;

        return $this;
    }
}
