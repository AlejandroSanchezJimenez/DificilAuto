<?php

namespace App\Controller;

use App\Repository\UsuarioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreaExamenController extends AbstractController
{
    private $security;
    private $user;

    public function __construct(Security $security, UsuarioRepository $user)
    {
       $this->security = $security;
       $this->user = $user;
    }

    #[Route('/creaExamen', name: 'app_crea_examen')]
    public function index(): Response
    {
        $email= $this->security->getUser()->getUserIdentifier();
        $rol = $this->security->getUser()->getRoles();

        return $this->render('crea_examen/index.html.twig', [
            'logged_user' => $email,
            'rol' => $rol[0]
        ]);
    }
}
