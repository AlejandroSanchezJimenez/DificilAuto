<?php

namespace App\Entity;

use App\Repository\DificultadRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DificultadRepository::class)]
class Dificultad
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 40)]
    private ?string $Nombre = null;

    #[ORM\OneToMany(mappedBy: 'idDificultad', targetEntity: Pregunta::class, orphanRemoval: true)]
    private Collection $preguntas;

    public function __construct()
    {
        $this->preguntas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->Nombre;
    }

    public function setNombre(string $Nombre): static
    {
        $this->Nombre = $Nombre;

        return $this;
    }

    /**
     * @return Collection<int, Pregunta>
     */
    public function getPreguntas(): Collection
    {
        return $this->preguntas;
    }

    public function addPregunta(Pregunta $pregunta): static
    {
        if (!$this->preguntas->contains($pregunta)) {
            $this->preguntas->add($pregunta);
            $pregunta->setIdDificultad($this);
        }

        return $this;
    }

    public function removePregunta(Pregunta $pregunta): static
    {
        if ($this->preguntas->removeElement($pregunta)) {
            // set the owning side to null (unless already changed)
            if ($pregunta->getIdDificultad() === $this) {
                $pregunta->setIdDificultad(null);
            }
        }

        return $this;
    }
}
