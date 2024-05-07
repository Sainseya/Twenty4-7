<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\Product;
use App\Entity\CartProduct;


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

    #[Route('/cart/add', name: 'app_cart_add_product', methods: ['POST'])]
    public function addProductToCart(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérifier si les clés existent dans les données JSON
        if (!isset($data['user_id']) || !isset($data['product_id'])) {
            return new JsonResponse([
                'message' => 'Invalid request data!',
            ], Response::HTTP_BAD_REQUEST);
        }

        $userId = $data['user_id'];
        $productId = $data['product_id'];

        $entityManager = $this->doctrine->getManager();
        assert($entityManager !== null, 'Entity manager is not initialized!');

        $userRepository = $this->doctrine->getRepository(User::class);
        $user = $userRepository->find($userId);

        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $productRepository = $this->doctrine->getRepository(Product::class);
        $product = $productRepository->find($productId);

        if (!$product) {
            return new JsonResponse([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        // Créer une nouvelle instance de CartItem et associer le produit et la quantité
        $cartItem = new CartProduct();
        $cartItem->setProduct($product);
        $cartItem->setQuantity(1); // Vous pouvez ajuster la quantité en fonction de vos besoins

        // Rechercher le panier de l'utilisateur ou en créer un s'il n'existe pas
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);

        if (!$cart) {
            $cart = new Cart();
            $cart->setUser($user);
            $cart->setCreationDate(new \DateTime());
            $entityManager->persist($cart);
        }

        // Ajouter l'élément du panier à l'entité du panier
        $cart->setItem($cartItem);

        // Utiliser une transaction pour garantir l'intégrité des données
        $entityManager->beginTransaction();
        try {
            $entityManager->persist($cartItem);
            $entityManager->flush();
            $entityManager->commit();
        } catch (\Exception $e) {
            $entityManager->rollback();
            return new JsonResponse([
                'message' => 'An error occurred while adding product to cart!',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse([
            'message' => 'Product added to cart successfully',
        ], Response::HTTP_CREATED);
    }

    #[Route('/cart/view', name: 'app_cart_add_product', methods: ['GET'])]
    public function viewCart(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['user_id'])) {
            return new JsonResponse([
                'message' => 'Invalid request data!',
            ], Response::HTTP_BAD_REQUEST);
        }
    
        $userId = $data['user_id'];
    
        $entityManager = $this->doctrine->getManager();
        $userRepository = $this->doctrine->getRepository(User::class);
        $user = $userRepository->find($userId);
    
        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);
    
        if (!$cart) {
            return new JsonResponse([
                'message' => 'Cart not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartProducts = $cart->getItems();
    
        $cartDetails = [];

        $cartProducts = $this->doctrine->getRepository(CartProduct::class)->findBy(['cart' => $cart]);

        foreach ($cartProducts as $cartProduct) {
            $product = $cartProduct->getProduct();
            $cartDetails[] = [
                'product_id' => $product->getId(),
                'name' => $product->getName(),
                'quantity' => $cartProduct->getQuantity(),
            ];
        }
    
        return new JsonResponse([
            'cart_items' => $cartDetails,
        ], Response::HTTP_OK);
    }

        public function viewCart(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['user_id'])) {
            return new JsonResponse([
                'message' => 'Invalid request data!',
            ], Response::HTTP_BAD_REQUEST);
        }
    
        $userId = $data['user_id'];
    
        $entityManager = $this->doctrine->getManager();
        $userRepository = $this->doctrine->getRepository(User::class);
        $user = $userRepository->find($userId);
    
        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);
    
        if (!$cart) {
            return new JsonResponse([
                'message' => 'Cart not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartProducts = $cart->getItems();
    
        $cartDetails = [];

        $cartProducts = $this->doctrine->getRepository(CartProduct::class)->findBy(['cart' => $cart]);

        foreach ($cartProducts as $cartProduct) {
            $product = $cartProduct->getProduct();
            $cartDetails[] = [
                'product_id' => $product->getId(),
                'name' => $product->getName(),
                'quantity' => $cartProduct->getQuantity(),
            ];
        }
    
        return new JsonResponse([
            'cart_items' => $cartDetails,
        ], Response::HTTP_OK);
    }
}