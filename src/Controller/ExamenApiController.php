<?php

namespace App\Controller;

use App\Entity\Examen;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ExamenApiController extends AbstractController
{
    #[Route('/examen/api', name: 'app_examen_api')]
    public function addExamen(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $fechaHoraCreacion = new \DateTime();
        $preguntas = $data['preguntas'];
        $intentos = $data['intento'];

        $examen = new Examen();
        $examen->setFechaHoraCreacion($fechaHoraCreacion);
        $examen->addIntento($intentos);

        // Asociar preguntas al examen
        foreach ($preguntas as $preguntaData) {
            $examen->addIdPregunta($preguntaData['id']);
        }

        $entityManager->persist($examen);
        $entityManager->flush();

        return $this->json(['message' => 'Examen creado'], 201);
    }
}
