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
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;

class CartController extends AbstractController
{
    
    private $doctrine;
    private EntityManagerInterface $entityManager;
    private JWTEncoderInterface $jwtEncoder;
    
    public function __construct(ManagerRegistry $doctrine, EntityManagerInterface $entityManager, JWTEncoderInterface $jwtEncoder)
    {
        $this->doctrine = $doctrine;
        $this->entityManager = $entityManager;
        $this->jwtEncoder = $jwtEncoder;
    }

    #[Route('/api/carts/{productId}', methods: ['POST'])]
    public function addProductToCart(Request $request, $productId, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        $authHeader = $request->headers->get('Authorization');
        $jwtString = str_replace('Bearer ', '', $authHeader);
        $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
    
        $username = $decodedJwtToken['username'];
        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
    
        if (!$user) {
            return $this->json(['message' => 'User not found'], 404);
        }
    
        $productRepository = $this->doctrine->getRepository(Product::class);
        $product = $productRepository->find($productId);
    
        if (!$product) {
            return new JsonResponse([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        // Find the user's cart or create one if it doesn't exist
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);
    
        if (!$cart) {
            $cart = new Cart();
            $cart->setUser($user);
            $cart->setCreationDate(new \DateTime());
            $this->entityManager->persist($cart);
        }
    
        // Check if the product is already in the cart
        $cartProduct = $cart->getItem($productId);
    
        if ($cartProduct) {
            $cartProduct->setQuantity($cartProduct->getQuantity() + $data['quantity']);
            $cartProduct->setIsInCart(true); // Set isInCart to true
        } else {
            $cartProduct = new CartProduct();
            $cartProduct->setProduct($product);
            $cartProduct->setQuantity($data['quantity']);
            $cartProduct->setIsInCart(true); // Set isInCart to true

            $cart->setItem($cartProduct);
        }
    
        // Use a transaction to ensure data integrity
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


    #[Route('/api/carts', methods: ['GET'])]
    public function viewCart(Request $request, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager): JsonResponse
    {
        $authHeader = $request->headers->get('Authorization');
        $jwtString = str_replace('Bearer ', '', $authHeader);
        $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
    
        $username = $decodedJwtToken['username'];
        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
    
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
    
        $cartProducts = $this->doctrine->getRepository(CartProduct::class)->findBy(['cart' => $cart, 'isInCart' => true]);
    
        foreach ($cartProducts as $cartProduct) {
            $product = $cartProduct->getProduct();
            $cartDetails[] = [
                'product_id' => $product->getId(),
                'name' => $product->getName(),
                'quantity' => $cartProduct->getQuantity(),
                'is_in_cart' => $cartProduct->getIsInCart(),
            ];
        }
    
        return new JsonResponse([
            'cart_items' => $cartDetails,
        ], Response::HTTP_OK);
    }
    
    #[Route('/api/carts/{productId}', methods: ['DELETE'])]
    public function removeProductFromCart(Request $request, $productId, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager): JsonResponse
    {
        $authHeader = $request->headers->get('Authorization');
        $jwtString = str_replace('Bearer ', '', $authHeader);
        $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
    
        $username = $decodedJwtToken['username'];
        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
    
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
    
        $cartRepository = $this->doctrine->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);
    
        if (!$cart) {
            return new JsonResponse([
                'message' => 'Cart not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartItem = $cart->getItem($productId);
    
        if (!$cartItem) {
            return new JsonResponse([
                'message' => 'Product not found in cart!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        // Set isInCart to false instead of removing the cart item
        $cartItem->setIsInCart(false);
    
        $entityManager->persist($cartItem);
        $entityManager->flush();
    
        return new JsonResponse([
            'message' => 'Product removed from cart successfully',
        ], Response::HTTP_OK);
    }
    
    #[Route('/api/carts', methods: ['DELETE'])]
    public function deleteCart(Request $request, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager): JsonResponse
    {
        $authHeader = $request->headers->get('Authorization');
        $jwtString = str_replace('Bearer ', '', $authHeader);
        $decodedJwtToken = $this->jwtEncoder->decode($jwtString);
    
        $username = $decodedJwtToken['username'];
        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
    
        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartRepository = $entityManager->getRepository(Cart::class);
        $cart = $cartRepository->findOneBy(['user' => $user]);
    
        if (!$cart) {
            return new JsonResponse([
                'message' => 'Cart not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    
        $cartProducts = $cart->getItems();
        if ($cartProducts) {
            foreach ($cartProducts as $cartProduct) {
                // Set isInCart to false instead of removing the cart product
                $cartProduct->setIsInCart(false);
                $entityManager->persist($cartProduct);
                $entityManager->getUnitOfWork()->propertyChanged($cartProduct, 'isInCart');
            }
            $entityManager->flush(); 
        }
    
        return new JsonResponse([
            'message' => 'Cart deleted successfully',
        ], Response::HTTP_OK);
    }
}