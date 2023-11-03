<?php

namespace App\Controller;

use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ValidaAlumnosController extends AbstractController
{
    private $security;
    private $user;

    public function __construct(Security $security, UsuarioRepository $user)
    {
       $this->security = $security;
       $this->user = $user;
    }

    #[Route('/validaAlumnos', name: 'app_valida_alumnos')]
    public function index(): Response
    {
        $email= $this->security->getUser()->getUserIdentifier();
        $users= $this->user->findNoVerified();
        $rol = $this->security->getUser()->getRoles();

        return $this->render('valida_alumnos/index.html.twig', [
            'controller_name' => 'ValidaAlumnosController',
            'logged_user' => $email,
            'users' => $users,
            'rol' => $rol[0]
        ]);
    }
}
