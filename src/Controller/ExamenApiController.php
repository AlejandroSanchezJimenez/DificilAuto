<?php

namespace App\Controller;

use App\Entity\Examen;
use App\Entity\Intento;
use App\Entity\Pregunta;
use App\Entity\Usuario;
use App\Repository\CategoriaRepository;
use App\Repository\DificultadRepository;
use App\Repository\PreguntaRepository;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Length;

class ExamenApiController extends AbstractController
{
    #[Route('/examen/api', name: 'app_examen_api')]
    public function addExamen(Request $request, EntityManagerInterface $entityManager, CategoriaRepository $catrep, DificultadRepository $difrep, PreguntaRepository $pregrep, UsuarioRepository $usurep): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $fechaHoraCreacion = new \DateTime();
        $alumnos = $data['alumnos'];
        $idcategoria = $data['categoria'];
        $iddificultad = $data['dificultad'];

        $examen = new Examen();
        if ($idcategoria!==null) {
            $categoria=$catrep->find($idcategoria);
            $examen->setCategoria($categoria);

            $preguntas = $data['preguntas'];

            for ($i = 0; $i < count($preguntas); $i++) {
            $pregunta = new Pregunta();
            $pregunta = $pregrep->find($preguntas[$i]);
            $examen->addIdPregunta($pregunta);
        }
        }
        if ($iddificultad!==null) {
            $dificultad=$difrep->find($iddificultad);
            $examen->setDificultad($dificultad);

            $preguntas = $pregrep->findByDifRand($data['dificultad']);

            for ($i = 0; $i < count($preguntas); $i++) {
                $pregunta = new Pregunta();
                $pregunta = $pregrep->find($preguntas[$i]['id']);
                $examen->addIdPregunta($pregunta);
            }
        }

        for ($i = 0; $i < count($alumnos); $i++) {
            $usuario = new Usuario();
            $usuario = $usurep->find($alumnos[$i]);
            $examen->addAlumno($usuario);
        }

        $examen->setFechaHoraCreacion($fechaHoraCreacion);        

        $entityManager->persist($examen);
        $entityManager->flush();

        return $this->json(['message' => 'Examen creado'], 201);
    }
}
