<?php

namespace App\Controller;

use App\Entity\Intento;
use App\Repository\ExamenRepository;
use App\Repository\IntentoRepository;
use App\Repository\PreguntaRepository;
use App\Repository\UsuarioRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class IntentoApiController extends AbstractController
{
    #[Route('/intento/api', name: 'app_intento_api')]
    public function addIntento(Request $request, EntityManagerInterface $entityManager, ExamenRepository $exrep, UsuarioRepository $usrep, PreguntaRepository $pregrep): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Obtener los datos de la solicitud JSON
        $idalumno = $data['idalumno'];
        $idexamen = $data['idexamen'];
        $jsonrespuestas = $data['jsonRespuestas'];

        // Crear una nueva fecha actual
        $fecha = new DateTime();

        // Inicializar la calificación en 0
        $calificacion = 0;

        // Crear un nuevo objeto Intento
        $intento = new Intento();

        // Obtener el examen correspondiente
        $examen = $exrep->find($idexamen);

        // Inicializar un arreglo para almacenar las respuestas correctas
        $arrayCorrectas = [];

        // Obtener las preguntas del examen
        $preguntas = $examen->getIdPreguntas();
        foreach ($preguntas as $pregunta) {
            // Obtener las respuestas correctas de las preguntas
            $arrayCorrectas[] = $pregunta->getCorrecta();
        }

        // Calcular la calificación
        for ($i = 0; $i < count($arrayCorrectas); $i++) {
            if ($jsonrespuestas[$i] === $arrayCorrectas[$i]) {
                $calificacion++;
            }
        }

        // Obtener el alumno correspondiente
        $alumno = $usrep->find($idalumno);

        // Configurar los datos del intento
        $intento->setIdAlumno($alumno);
        $intento->setIdExamen($examen);
        $intento->setFecha($fecha);
        $intento->setJsonRespuestas($jsonrespuestas);
        $intento->setCalificacion($calificacion);

        // Persistir el intento en la base de datos
        $entityManager->persist($intento);
        $entityManager->flush();

        // Responder con una respuesta JSON
        return $this->json(['message' => 'Intento creado'], 201);
    }

    #[Route('/intento/api/{id}', name: 'app_intento_get_id', methods: ['GET', 'HEAD'])]
    public function getIntentoByExamen(IntentoRepository $intento, int $id, PreguntaRepository $preguntarep): JsonResponse
    {
        $intento = $intento->find($id);
        $data = [];

        $data = [
            'jsonRespuestas' => $intento->getJSONRespuestas()
        ];

        return $this->json($data, 200);
    }
}
