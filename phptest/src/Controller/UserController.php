<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserController extends AbstractController
{
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): JsonResponse
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
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'User creation failed: ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        $token = $JWTManager->create($user);

        return new JsonResponse(['status' => 'User created', 'token' => $token], JsonResponse::HTTP_CREATED);
    }

    #[Route('/login', name: 'user_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $repository = $entityManager->getRepository(User::class);
        $user = $repository->findOneBy(['username' => $data['username']]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Invalid credentials'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $token = $JWTManager->create($user);

        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }


    // #[Route('/api/user', name: 'user_update', methods: ['PUT'])]
    // public function update(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): JsonResponse
    // {
    //     $data = json_decode($request->getContent(), true);

    //     if ($data === null) {
    //         return $this->json(['message' => 'Invalid JSON'], 400);
    //     }

    //     $decodedToken = $JWTManager->decode($this->tokenStorage->getToken());
    //     if (isset($decodedToken['username'])) {
    //         $userId = $decodedToken['id'];
    //         $user = $entityManager->getRepository(User::class)->find($userId);
    //         if (!$user) {
    //             return $this->json(['message' => 'User not found'], 404);
    //         }

    //         // Update user properties with provided data
    //         $user->setFirstname($data['firstname'] ?? $user->getFirstname());
    //         $user->setLastname($data['lastname'] ?? $user->getLastname());
    //         $user->setRole($data['role'] ?? $user->getRole());
    //         $user->setEmail($data['email'] ?? $user->getEmail());
    //         $user->setWallet($data['wallet'] ?? $user->getWallet());
    //         $user->setBio($data['bio'] ?? $user->getBio());

    //         // If a new password is provided, hash and update the password
    //         if (isset($data['password'])) {
    //             $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
    //         }

    //         try {
    //             $entityManager->flush();
    //         } catch (\Exception $e) {
    //             return new JsonResponse(['error' => 'User update failed: ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    //         }

    //         return new JsonResponse(['status' => 'User updated'], JsonResponse::HTTP_OK);
    //     }
    // }
}