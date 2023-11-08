<?php

namespace App\Controller;

use App\Entity\Categoria;
use App\Entity\Dificultad;
use App\Entity\Examen;
use App\Entity\Pregunta;
use App\Repository\CategoriaRepository;
use App\Repository\DificultadRepository;
use App\Repository\ExamenRepository;
use App\Repository\PreguntaRepository;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PreguntaApiController extends AbstractController
{
    #[Route('/pregunta/api/', name: 'app_pregunta_api_add', methods: ['POST'])]
    public function addPregunta(Request $request, PreguntaRepository $preguntarep, CategoriaRepository $catrep, DificultadRepository $difrep, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $enunciado = $data['enunciado'];
        $opc1 = $data['opc1'];
        $opc2 = $data['opc2'];
        $opc3 = $data['opc3'];
        $correcta = $data['correcta'];
        $url = $data['url'];
        $urltype = $data['urltype'];
        $Categoriaid = $data['idCategoria'];
        $Dificultadid = $data['idDificultad'];

        $pregunta = new Pregunta();
        $categoria = $catrep->find($Categoriaid);
        $dificultad = $difrep->find($Dificultadid);

        $pregunta->setEnunciado($enunciado);
        $pregunta->setOpc1($opc1);
        $pregunta->setOpc2($opc2);
        $pregunta->setOpc3($opc3);
        $pregunta->setCorrecta($correcta);
        $pregunta->setUrl($url);
        $pregunta->setUrltype($urltype);
        $pregunta->setIdCategoria($categoria);
        $pregunta->setIdDificultad($dificultad);

        $entityManager->persist($pregunta);
        $entityManager->flush();

        return $this->json($data, $status = 201);
    }

    #[Route('/pregunta/api/{id}', name: 'app_pregunta_api_delete', methods: ['DELETE'])]
    public function removePregunta(PreguntaRepository $preguntarep, int $id): JsonResponse
    {
        $pregunta = $preguntarep->find($id);

        if (!$pregunta) {
            return $this->json(['message' => 'No hay ninguna pregunta con esa id'], 404);
        }

        $preguntarep->remove($pregunta, true);

        return $this->json([], 204);
    }

    #[Route('/pregunta/api/', name: 'app_pregunta_api_getAll', methods: ['GET', 'HEAD'])]
    public function getPregunta(PreguntaRepository $preguntarep): JsonResponse
    {
        $preguntas = $preguntarep->findAll();
        $datos = [];

        if ($preguntas) {
            foreach ($preguntas as $pregunta) {
                $datos[] = $preguntarep->toArray($pregunta);
            }
        } else {
            return $this->json(['message' => 'No hay preguntas creadas'], 404);
        }

        return $this->json($datos, 200);
    }

    #[Route('/pregunta/api/byExamen/{id}', name: 'app_pregunta_api_getAll', methods: ['GET', 'HEAD'])]
    public function getPreguntasByExamen(ExamenRepository $exarep, int $id, PreguntaRepository $preguntarep): JsonResponse
    {
        $examen = $exarep->find($id);
        $preguntas = $examen->getIdPreguntas();
        $datos = [];

        if ($preguntas) {
            foreach ($preguntas as $pregunta) {
                $datos[] = $preguntarep->toArray($pregunta);
            }
        } else {
            return $this->json(['message' => 'No hay preguntas creadas'], 404);
        }

        return $this->json($datos, 200);
    }

    #[Route('/pregunta/api/{id}', name: 'app_pregunta_api_getOne', methods: ['GET', 'HEAD'])]
    public function getPreguntaByID(PreguntaRepository $preguntarep, ExamenRepository $exarep, int $id): JsonResponse
    {
        $pregunta = $preguntarep->findByCategoria($id);

        if (!empty($pregunta)) {
            foreach ($pregunta as $preg) {
                $datos[] = $preguntarep->toArray($preg);
            }

            return $this->json($datos, $status=200);
        } else {
            return $this->json('No hay preguntas para esa categoria', $status=404);
        }
    }
}
