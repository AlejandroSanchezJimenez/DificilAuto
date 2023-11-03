<?php

namespace App\Controller;

use App\Entity\Dificultad;
use App\Repository\DificultadRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DificultadApiController extends AbstractController
{
    #[Route('/dificultad/api', name: 'app_dificultad_api')]
    public function getAllDificultades(DificultadRepository $dificultadRepository): JsonResponse
    {
        $dificultades = $dificultadRepository->findAll();
        $data = [];

        foreach ($dificultades as $dificultad) {
            $data[] = [
                'id' => $dificultad->getId(),
                'nombre' => $dificultad->getNombre(),
            ];
        }

        return $this->json($data, 200);
    }

    #[Route('/categoria/api/{id}', name: 'app_categoria_api_getOne', methods: ['GET'])]
    public function getCategoria(DificultadRepository $dificultadRepository, $id): JsonResponse
    {
        $dificultad = $dificultadRepository->find($id);

        if (!$dificultad) {
            return $this->json(['message' => 'No existe una categoría con ese ID'], 404);
        }

        $data = [
            'id' => $dificultad->getId(),
            'nombre' => $dificultad->getNombre(),
        ];

        return $this->json($data, 200);
    }
}
