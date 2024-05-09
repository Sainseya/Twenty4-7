<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;


class UserController extends AbstractController
{

    private $jwtEncoder;

    public function __construct(JWTEncoderInterface $jwtEncoder)
    {
        $this->jwtEncoder = $jwtEncoder;
    }

    #[Route('/api/register', name: 'user_register', methods: ['POST'])]
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

    #[Route('/api/login', name: 'user_login', methods: ['POST'])]
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


    #[Route('/api/user', name: 'user_update', methods: ['PUT'])]
    public function update(Request $request, JWTTokenManagerInterface $jwtManager, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {

        try {
            $data = json_decode($request->getContent(), true);

            if ($data === null) {
                return $this->json(['message' => 'Invalid JSON'], 400);
            }
        
            $authHeader = $request->headers->get('Authorization');
            $jwtString = str_replace('Bearer ', '', $authHeader);
            try {
                $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
            } catch (\Exception $e) {
                return $this->json(['message' => 'Invalid or missing token'], JsonResponse::HTTP_UNAUTHORIZED);
            }


            $username = $decodedJwtToken['username'];
            $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

            if (!$user) {
                return $this->json(['message' => 'User not found'], 404);
            }

            // Update user properties with provided data
            $user->setFirstname($request->get('firstname') ?? $user->getFirstname());
            $user->setLastname($request->get('lastname') ?? $user->getLastname());
            $user->setRole($request->get('role') ?? $user->getRole());
            $user->setEmail($request->get('email') ?? $user->getEmail());
            $user->setWallet($request->get('wallet') ?? $user->getWallet());
            $user->setBio($request->get('bio') ?? $user->getBio());

            // If a new password is provided, hash and update the password
            if ($request->get('password')) {
                $user->setPassword($passwordHasher->hashPassword($user, $request->get('password')));
            }

            $entityManager->flush();

            return $this->json(['status' => 'User updated'], 200);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], 401);
        }
    }
    #[Route('/api/user', name: 'user_delete', methods: ['DELETE'])]
    public function delete(Request $request, JWTTokenManagerInterface $jwtManager, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {

        try {
        
            $authHeader = $request->headers->get('Authorization');
            $jwtString = str_replace('Bearer ', '', $authHeader);
            try {
                $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
            } catch (\Exception $e) {
                return $this->json(['message' => 'Invalid or missing token'], JsonResponse::HTTP_UNAUTHORIZED);
            }
            $username = $decodedJwtToken['username'];
            $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

            if (!$user) {
                return $this->json(['status' => 'User not found'], 404);
            }
            
            #delete user from database
            $entityManager->remove($user);
            $entityManager->flush();
            return $this->json(['status' => 'User deleted'], 200);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], 401);
        }
    }
    #[Route('/api/user', name: 'user_get', methods: ['GET'])]
    public function get(Request $request, JWTTokenManagerInterface $jwtManager, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {

        try {
        
            $authHeader = $request->headers->get('Authorization');
            $jwtString = str_replace('Bearer ', '', $authHeader);
            try {
                $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
            } catch (\Exception $e) {
                return $this->json(['message' => 'Invalid or missing token'], JsonResponse::HTTP_UNAUTHORIZED);
            }
            $username = $decodedJwtToken['username'];
            $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

            if (!$user) {
                return $this->json(['status' => 'User not found'], 404);
            }
            #return user from database
            return $this->json(['status' => 'User found', 'user' => $user->toArray()], 200);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], 401);
        }
    }

    #cheat route to get all users from database we love cybersecurity here
    #[Route('/api/users', name: 'users_get_all', methods: ['GET'])]
    public function getAllUsers(EntityManagerInterface $entityManager): JsonResponse
    {
    $userRepository = $entityManager->getRepository(User::class);
    $users = $userRepository->findAll();

    if (!$users) {
        return $this->json(['status' => 'No users found'], 404);
    }

    $usersArray = array_map(function($user) {
        return $user->toArray();
    }, $users);

    return $this->json(['status' => 'Users found', 'users' => $usersArray], 200);
}

    }
    
