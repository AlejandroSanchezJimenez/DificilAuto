<?php

namespace App\Controller;

use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreaPreguntasController extends AbstractController
{
    private $security;
    private $user;

    public function __construct(Security $security, UsuarioRepository $user)
    {
       $this->security = $security;
       $this->user = $user;
    }

    #[Route('/creaPreguntas', name: 'app_crea_preguntas')]
    public function index(): Response
    {
        $email= $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();

        return $this->render('crea_preguntas/index.html.twig', [
            'controller_name' => 'CreaPreguntasController',
            'logged_user' => $email,
            'rol' => $rol[0]
        ]);
    }
}
