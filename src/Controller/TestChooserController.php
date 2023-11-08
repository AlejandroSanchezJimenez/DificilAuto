<?php

namespace App\Controller;

use App\Repository\ExamenRepository;
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

    public function __construct(Security $security, UsuarioRepository $user, ExamenRepository $examen)
    {
       $this->security = $security;
       $this->user = $user;
       $this->examen = $examen;
    }

    #[Route('/testChooser', name: 'app_test_chooser')]
    public function index(): Response
    {
        $email= $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();

        if (!empty($_GET["dif"])) {
            $dif=$_GET["dif"];
            $examenes = $this->examen->findExamByUserDif($email,$dif);
        } else if ($_GET["cat"]) {
            $cat=$_GET["cat"];
            $examenes = $this->examen->findExamByUserCat($email);
        }

        return $this->render('test_chooser/index.html.twig', [
            'rol' => $rol[0],
            'examenes' => $examenes,
            'logged_user' => $email
        ]);
    }
}
