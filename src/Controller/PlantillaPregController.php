<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PlantillaPregController extends AbstractController
{
    #[Route('/plantillaPreg', name: 'app_plantilla_preg')]
    public function index(): Response
    {
        return $this->render('plantilla_preg/index.html.twig', [
            'controller_name' => 'PlantillaPregController',
        ]);
    }
}
