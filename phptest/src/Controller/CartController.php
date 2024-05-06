<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController
{
    private $doctrine;
    
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }


    #[Route('/cart/create', name: 'app_cart_create', methods: ['POST'])]
    public function createCart(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $cart = new Cart();
        $cart->setCreationDate(new \DateTime());

        $userId = $data['user_id'];
        $userRepository = $this->doctrine->getRepository(User::class);
        $user = $userRepository->find($userId);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $cart->setUser($user);

        // Obtention du gestionnaire d'entités et enregistrement du panier en base de données
        $entityManager = $this->doctrine->getManager();
        $entityManager->persist($cart);
        $entityManager->flush();

        // Retourner une réponse JSON avec un message de succès et les détails du panier créé
        return new JsonResponse([
            'message' => 'Cart created successfully',
            'cart' => [
                'id' => $cart->getId(),
                'creation_date' => $cart->getCreationDate()->format('Y-m-d H:i:s'),
                'user_id' => $cart->getUser()->getId(),
                'order_id' => $cart->getOrderID(),
                // Ajoutez d'autres données du panier si nécessaire
            ]
        ], Response::HTTP_CREATED);
    }
}
