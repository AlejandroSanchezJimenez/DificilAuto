<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    private $security;
    private $user;

    public function __construct(Security $security)
    {
       $this->security = $security;
    }

    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        $email= $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'logged_user' => $email,
            'rol' => $rol[0]
        ]);
    }
}
