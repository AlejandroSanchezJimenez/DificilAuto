<?php

namespace App\Controller;

use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UsuarioApiController extends AbstractController
{
    #[Route('/usuario/api/crear', name: 'app_usuario_api_add', methods: ['POST'])]
    public function addUsuario(Request $request, UsuarioRepository $usuarioRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Obtener los datos del usuario (id, email, isVerified) desde $data
        $id = $data['id'];
        $email = $data['email'];
        $isVerified = $data['isVerified'];

        // Crear una nueva entidad de Usuario
        $usuario = new Usuario();
        $usuario->setEmail($id);
        $usuario->setEmail($email);
        $usuario->setIsVerified($isVerified);

        // Guardar el usuario en la base de datos
        $usuarioRepository->save($usuario, true);

        return $this->json(['message' => 'Usuario creado'], 201);
    }

    #[Route('/usuario/api/eliminar/{id}', name: 'app_usuario_api_delete', methods: ['DELETE'])]
    public function removeUsuario(UsuarioRepository $usuarioRepository, $id): JsonResponse
    {
        $usuario = $usuarioRepository->find($id);

        if (!$usuario) {
            return $this->json(['message' => 'No existe un usuario con ese ID'], 404);
        }

        $usuarioRepository->remove($usuario, true);

        return $this->json(['message' => 'Usuario eliminado'], 204);
    }

    #[Route('/usuario/api/{id}', name: 'app_usuario_api_getOne', methods: ['GET'])]
    public function getUsuario(UsuarioRepository $usuarioRepository, $id): JsonResponse
    {
        $usuario = $usuarioRepository->find($id);

        if (!$usuario) {
            return $this->json(['message' => 'No existe un usuario con ese ID'], 404);
        }

        $data = [
            'id' => $usuario->getId(),
            'email' => $usuario->getEmail(),
            'isVerified' => $usuario->isVerified(),
        ];

        return $this->json($data, 200);
    }

    #[Route('/usuario/api', name: 'app_usuario_api_getAll', methods: ['GET'])]
    public function getAllUsuarios(UsuarioRepository $usuarioRepository): JsonResponse
    {
        $usuarios = $usuarioRepository->findAll();
        $data = [];

        foreach ($usuarios as $usuario) {
            $data[] = [
                'id' => $usuario->getId(),
                'email' => $usuario->getEmail(),
                'isVerified' => $usuario->isVerified(),
            ];
        }

        return $this->json($data, 200);
    }

    #[Route('/usuario/api/editar/{id}', name: 'app_usuario_api_getOne', methods: ['PUT'])]
    public function updateUsuarioByID(Request $request, $id, UsuarioRepository $usuarioRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $usuario= $usuarioRepository->find($id);
        $data = json_decode($request->getContent(), true);

        // Actualiza los campos del usuario
        $usuario->setRoles($data['rol']);
        $usuario->setIsVerified($data['isVerified']);

        $entityManager->persist($usuario);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario actualizado con éxito']);
    }
}
