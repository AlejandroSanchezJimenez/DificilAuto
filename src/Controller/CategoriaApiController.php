<?php

namespace App\Controller;

use App\Repository\CategoriaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoriaApiController extends AbstractController
{
    #[Route('/categoria/api', name: 'app_categoria_api')]
    public function getAllCategorias(CategoriaRepository $categoriaRepository): JsonResponse
    {
        $categorias = $categoriaRepository->findAll();
        $data = [];

        foreach ($categorias as $categoria) {
            $data[] = [
                'id' => $categoria->getId(),
                'nombre' => $categoria->getNombre(),
            ];
        }

        return $this->json($data, 200);
    }

    #[Route('/categoria/api/{id}', name: 'app_categoria_api_getOne', methods: ['GET'])]
    public function getCategoria(CategoriaRepository $categoriaRepository, $id): JsonResponse
    {
        $categoria = $categoriaRepository->find($id);

        if (!$categoria) {
            return $this->json(['message' => 'No existe una categoría con ese ID'], 404);
        }

        $data = [
            'id' => $categoria->getId(),
            'nombre' => $categoria->getNombre(),
            // Agrega otros campos de la entidad Categoria que desees incluir en la respuesta JSON
        ];

        return $this->json($data, 200);
    }
}
