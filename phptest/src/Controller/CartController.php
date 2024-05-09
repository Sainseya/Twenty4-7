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
use Doctrine\ORM\EntityManagerInterface;

class CartController extends AbstractController
{
    private $doctrine;
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $doctrine, EntityManagerInterface $entityManager)
    {
        $this->doctrine = $doctrine;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/carts/{productId}', methods: ['POST'])]
    public function addProductToCart(Request $request, $productId): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

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
        
        if (!isset($data['user_id'])) {
            return new JsonResponse([
                'message' => 'Invalid request data!',
            ], Response::HTTP_BAD_REQUEST);
        }

        $productRepository = $this->doctrine->getRepository(Product::class);
        $product = $productRepository->find($productId);

        if (!$product) {
            return new JsonResponse([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $userId = $data['user_id'];

        $userRepository = $this->doctrine->getRepository(User::class);
        $user = $userRepository->find($userId);

        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        // Créer une nouvelle instance de CartProduct et associer le produit et la quantité
        $cartProduct = new CartProduct();
        $cartProduct->setProduct($product);
        $cartProduct->setQuantity(1); // Vous pouvez ajuster la quantité en fonction de vos besoins

        // Rechercher le panier de l'utilisateur ou en créer un s'il n'existe pas
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);

        if (!$cart) {
            $cart = new Cart();
            $cart->setUser($user);
            $cart->setCreationDate(new \DateTime());
            $this->entityManager->persist($cart);
        }

        // Ajouter le produit au panier
        $cart->setItem($cartProduct);

        // Utiliser une transaction pour garantir l'intégrité des données
        $this->entityManager->beginTransaction();
        try {
            $this->entityManager->persist($cartProduct);
            $this->entityManager->flush();
            $this->entityManager->commit();
        } catch (\Exception $e) {
            $this->entityManager->rollback();
            return new JsonResponse([
                'message' => 'An error occurred while adding product to cart!',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse([
            'message' => 'Product added to cart successfully',
        ], Response::HTTP_CREATED);
    }


    #[Route('/api/carts', name: 'app_cart_add_product', methods: ['GET'])]
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

    #[Route('/api/carts/{productId}', methods: ['DELETE'])]
    public function removeProductFromCart(Request $request, $productId): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérifier si les clés existent dans les données JSON
        if (!isset($data['user_id'])) {
            return new JsonResponse([
                'message' => 'Invalid request data!',
            ], Response::HTTP_BAD_REQUEST);
        }

        $userId = $data['user_id'];

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

        // Rechercher le panier de l'utilisateur
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);

        if (!$cart) {
            return new JsonResponse([
                'message' => 'Cart not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        // Vérifier si le produit est présent dans le panier
        $cartItem = $cart->getItem($productId);

        if (!$cartItem) {
            return new JsonResponse([
                'message' => 'Product not found in cart!',
            ], Response::HTTP_NOT_FOUND);
        }

        // Supprimer le produit du panier
        $cart->removeItem($cartItem);

        // Utiliser une transaction pour garantir l'intégrité des données
        $entityManager = $this->doctrine->getManager();
        $entityManager->beginTransaction();
        try {
            $entityManager->remove($cartItem);
            $entityManager->flush();
            $entityManager->commit();
        } catch (\Exception $e) {
            $entityManager->rollback();
            return new JsonResponse([
                'message' => 'An error occurred while removing product from cart!',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse([
            'message' => 'Product removed from cart successfully',
        ], Response::HTTP_OK);
    }
}