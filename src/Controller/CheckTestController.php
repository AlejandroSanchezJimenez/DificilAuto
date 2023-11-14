<?php

namespace App\Controller;

use App\Repository\ExamenRepository;
use App\Repository\IntentoRepository;
use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CheckTestController extends AbstractController
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

    #[Route('/checkTest', name: 'app_check_test')]
    public function index(): Response
    {
        $email = $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();
        $usuario = $this->user->findOneByEmail($email);
        $id = $usuario->getId();

        if (!empty($_GET["exId"])&&!empty($_GET["usId"])) {
            $exId = $_GET["exId"];
            $usId = $_GET['usId'];
            $intentos = $this->intento->findByExamenIDUs($exId, $usId);
        } else if ($_GET["cat"]) {
            $examenes = $this->examen->findExamByUserCat($email);
        }

        return $this->render('check_test/index.html.twig', [
            'rol' => $rol[0],
            'logged_user' => $email,
            'id' => $id,
            'intentos' => $intentos
        ]);
    }
}
