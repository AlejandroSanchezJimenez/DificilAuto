<?php

namespace App\Controller;

use App\Entity\Intento;
use App\Repository\ExamenRepository;
use App\Repository\IntentoRepository;
use App\Repository\PreguntaRepository;
use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestChooserController extends AbstractController
{
    private $security;
    private $user;
    private $examen;
    private $intento;

    public function __construct(Security $security, UsuarioRepository $user, ExamenRepository $examen, IntentoRepository $intento)
    {
        $this->security = $security;
        $this->user = $user;
        $this->examen = $examen;
        $this->intento = $intento;
    }

    #[Route('/testChooser', name: 'app_test_chooser')]
    public function index(): Response
    {
        $email = $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();
        $usuario = $this->user->findOneByEmail($email);
        $id = $usuario->getId();

        if (!empty($_GET["dif"])) {
            if ($rol !== "ROLE_USER") {
                $dif = $_GET["dif"];
                $examenes = $this->examen->findExamByDif($dif);
                $tipo = "dif";
            } else {
                $dif = $_GET["dif"];
                $examenes = $this->examen->findExamByUserDif($email, $dif);
                $tipo = "dif";
            }
        } else if ($_GET["cat"]) {
            if ($rol !== "ROLE_USER") {
                $examenes = $this->examen->findExamByCat();
                $tipo = "cat";
            } else {
                $examenes = $this->examen->findExamByUserCat($email);
                $tipo = "cat";
            }
        }

        $intentos = [];
        $idintentos = $usuario->getIntentos();
        foreach ($idintentos as $element) {
            $intento = new Intento();
            $intento = $this->intento->find($element);
            array_push($intentos, $intento);
        }

        return $this->render('test_chooser/index.html.twig', [
            'rol' => $rol[0],
            'examenes' => $examenes,
            'logged_user' => $email,
            'id' => $id,
            'intentos' => $intentos,
            'tipo' => $tipo
        ]);
    }
}
