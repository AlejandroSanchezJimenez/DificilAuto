<?php

namespace App\Controller;

use App\Entity\Intento;
use App\Repository\ExamenRepository;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class IntentoApiController extends AbstractController
{
    #[Route('/intento/api', name: 'app_intento_api')]
    public function addIntento(Request $request, EntityManagerInterface $entityManager, ExamenRepository $exrep, UsuarioRepository $usrep): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $idalumno = $data['idalumno'];
        $idexamen = $data['idexamen'];
        $fecha = new \DateTime($data['fecha']);
        $jsonrespuestas = $data['jsonrespuestas'];
        $calificacion = $data['calificacion'];

        $intento = new Intento();
        $examen = $exrep->find($idalumno);
        $alumno = $usrep->find($idexamen);

        $intento->setIdAlumno($alumno);
        $intento->setIdExamen($examen);
        $intento->setFecha($fecha);
        $intento->setJsonRespuestas($jsonrespuestas);
        $intento->setCalificacion($calificacion);

        $entityManager->persist($intento);
        $entityManager->flush();

        return $this->json(['message' => 'Intento creado'], 201);
    }
}
