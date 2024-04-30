<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface; // Ajoutez cette ligne pour importer EntityManagerInterface

class UserController extends AbstractController
{
    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $user = new User();
        $user->setFirstname($data['firstname'] ?? '');
        $user->setUsername($data['username'] ?? '');
        $user->setLastname($data['lastname'] ?? '');
        $user->setRole($data['role'] ?? '');
        $user->setEmail($data['email'] ?? '');
        $user->setWallet($data['wallet'] ?? 0);
        $user->setBio($data['bio'] ?? '');
        $user->setCreatedAt(new \DateTime());
        $user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'User creation failed: ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse(['status' => 'User created'], JsonResponse::HTTP_CREATED);
    }
}
