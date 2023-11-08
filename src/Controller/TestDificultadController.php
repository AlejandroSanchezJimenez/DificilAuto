<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestDificultadController extends AbstractController
{
    private $security;
    private $user;

    public function __construct(Security $security)
    {
       $this->security = $security;
    }

    #[Route('/test', name: 'app_test_dificultad')]
    public function index(): Response
    {
        $email= $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();

        return $this->render('test_dificultad/index.html.twig', [
            'controller_name' => 'TestDificultadController',
            'logged_user' => $email,
            'rol' => $rol[0]
        ]);
    }
}
