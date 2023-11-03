<?php

namespace App\Entity;

use App\Repository\PreguntaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PreguntaRepository::class)]
class Pregunta
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $Enunciado = null;

    #[ORM\Column(length: 100)]
    private ?string $Opc1 = null;

    #[ORM\Column(length: 100)]
    private ?string $Opc2 = null;

    #[ORM\Column(length: 100)]
    private ?string $Opc3 = null;

    #[ORM\Column(length: 10)]
    private ?string $Correcta = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $Url = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $UrlType = null;

    #[ORM\ManyToOne(inversedBy: 'preguntas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Categoria $idCategoria = null;

    #[ORM\ManyToOne(inversedBy: 'preguntas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Dificultad $idDificultad = null;

    #[ORM\ManyToMany(targetEntity: Examen::class, mappedBy: 'idPreguntas')]
    private Collection $examens;

    public function __construct()
    {
        $this->examens = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEnunciado(): ?string
    {
        return $this->Enunciado;
    }

    public function setEnunciado(string $Enunciado): static
    {
        $this->Enunciado = $Enunciado;

        return $this;
    }

    public function getOpc1(): ?string
    {
        return $this->Opc1;
    }

    public function setOpc1(string $Opc1): static
    {
        $this->Opc1 = $Opc1;

        return $this;
    }

    public function getOpc2(): ?string
    {
        return $this->Opc2;
    }

    public function setOpc2(string $Opc2): static
    {
        $this->Opc2 = $Opc2;

        return $this;
    }

    public function getOpc3(): ?string
    {
        return $this->Opc3;
    }

    public function setOpc3(string $Opc3): static
    {
        $this->Opc3 = $Opc3;

        return $this;
    }

    public function getCorrecta(): ?string
    {
        return $this->Correcta;
    }

    public function setCorrecta(string $Correcta): static
    {
        $this->Correcta = $Correcta;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->Url;
    }

    public function setUrl(?string $Url): static
    {
        $this->Url = $Url;

        return $this;
    }

    public function getUrlType(): ?string
    {
        return $this->UrlType;
    }

    public function setUrlType(?string $UrlType): static
    {
        $this->UrlType = $UrlType;

        return $this;
    }

    public function getIdCategoria(): ?Categoria
    {
        return $this->idCategoria;
    }

    public function setIdCategoria(?Categoria $idCategoria): static
    {
        $this->idCategoria = $idCategoria;

        return $this;
    }

    public function getIdDificultad(): ?Dificultad
    {
        return $this->idDificultad;
    }

    public function setIdDificultad(?Dificultad $idDificultad): static
    {
        $this->idDificultad = $idDificultad;

        return $this;
    }

    /**
     * @return Collection<int, Examen>
     */
    public function getExamens(): Collection
    {
        return $this->examens;
    }

    public function addExamen(Examen $examen): static
    {
        if (!$this->examens->contains($examen)) {
            $this->examens->add($examen);
            $examen->addIdPregunta($this);
        }

        return $this;
    }

    public function removeExamen(Examen $examen): static
    {
        if ($this->examens->removeElement($examen)) {
            $examen->removeIdPregunta($this);
        }

        return $this;
    }
}
