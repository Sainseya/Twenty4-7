<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\Product;
use App\Entity\CartProduct;
use App\Entity\Order;
use App\Entity\OrderProduct;
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
    public function addProductToCart(Request $request, $productId, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager): JsonResponse
    {
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
            return new JsonResponse([
                'message' => 'Product is already in the cart!',
            ], Response::HTTP_BAD_REQUEST);
        } else {
            $cartProduct = new CartProduct();
            $cartProduct->setProduct($product);
            $cartProduct->setIsInCart(true); // Définir isInCart à true

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
    public function viewCart(Request $request): JsonResponse
    {
        $authHeader = $request->headers->get('Authorization');
        $jwtString = str_replace('Bearer ', '', $authHeader);
        $decodedJwtToken = $this->jwtEncoder->decode($jwtString);

        $username = $decodedJwtToken['username'];
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

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
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
                'quantity' => $cartProduct->getQuantity(),
                'is_in_cart' => $cartProduct->getIsInCart(),
            ];
        }

        return new JsonResponse([
            'products' => $cartDetails,
        ], Response::HTTP_OK);
    }

    #[Route('/api/carts/{productId}', methods: ['DELETE'])]
    public function removeProductFromCart(Request $request, $productId): JsonResponse
    {
        $username = $this->getUsernameFromToken($request);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

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

        $cartProductRepository = $this->doctrine->getRepository(CartProduct::class);
        $cartProduct = $cartProductRepository->findOneBy(['cart' => $cart, 'product' => $productId]);

        if (!$cartProduct) {
            return new JsonResponse([
                'message' => 'Product not found in the cart!',
            ], Response::HTTP_NOT_FOUND);
        }

        $entityManager = $this->doctrine->getManager();
        $entityManager->beginTransaction();
        try {
            $entityManager->remove($cartProduct);
            $entityManager->flush();
            $entityManager->commit();
        } catch (\Exception $e) {
            $entityManager->rollback();
            return new JsonResponse([
                'message' => 'An error occurred while removing product from cart!',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Set isInCart to false instead of removing the cart item
        $cartProduct->setIsInCart(false);

        $entityManager->persist($cartProduct);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Product removed from cart successfully',
        ], Response::HTTP_OK);
    }

    #[Route('/api/carts/validate', methods: ['PUT'])]
    public function validateOrder(Request $request): JsonResponse
    {
        $username = $this->getUsernameFromToken($request);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        $cart = $this->entityManager->getRepository(Cart::class)->findOneBy(['user' => $user]);

        if (!$cart) {
            return new JsonResponse(['error' => 'Cart not found'], Response::HTTP_NOT_FOUND);
        }

        $cartProducts = $this->entityManager->getRepository(CartProduct::class)->findBy(['cart' => $cart]);

        $entityManager = $this->doctrine->getManager();
        $entityManager->beginTransaction();

        try {
            $totalPrice = 0;
            foreach ($cartProducts as $cartProduct) {
                $totalPrice += $cartProduct->getProduct()->getPrice() * $cartProduct->getQuantity();
            }

            $order = new Order();
            $order->setCreationDate(new \DateTime());
            $order->setUser($cart->getUser());
            $order->setTotalePrice($totalPrice);
            $order->setDelivered(false);
            $entityManager->persist($order);

            foreach ($cartProducts as $cartProduct) {

                $orderProduct = new OrderProduct();
                $orderProduct->setOrder($order);
                $orderProduct->setProduct($cartProduct->getProduct());
                $orderProduct->setQuantity($cartProduct->getQuantity());
                $entityManager->persist($orderProduct);

                $entityManager->remove($cartProduct);
            }

            \Stripe\Stripe::setApiKey("REDACTED_STRIPE_KEY");
            $product = \Stripe\Product::create([
                'name' => 'Order Payment',
                'description' => 'Payment for order ' . $order->getId(),
                'type' => 'service',
            ]);

            $entityManager->flush();
            $entityManager->commit();

            return new JsonResponse(['success' => 'Payment session created successfully', $product], Response::HTTP_OK);
        } catch (\Exception $e) {
            $entityManager->rollback();

            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/orders', methods: ['GET'])]
    public function getUserOrders(Request $request): JsonResponse
    {
        $username = $this->getUsernameFromToken($request);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $userOrders = $this->entityManager->getRepository(Order::class)->findBy(['user' => $user]);

        $serializedOrders = [];
        foreach ($userOrders as $order) {
            $serializedOrders[] = [
                'id' => $order->getId(),
                'creation_date' => $order->getCreationDate()->format('Y-m-d H:i:s'),
                'total_price' => $order->getTotalePrice(),
            ];
        }

        return new JsonResponse($serializedOrders, Response::HTTP_OK);
    }

    #[Route('/api/orders/{orderId}', methods: ['GET'])]
    public function getOrderDetails(int $orderId, Request $request): JsonResponse
    {
        $username = $this->getUsernameFromToken($request);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $order = $this->entityManager->getRepository(Order::class)->find($orderId);

        if (!$order) {
            return new JsonResponse(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        $orderDetails = [
            'id' => $order->getId(),
            'creation_date' => $order->getCreationDate()->format('Y-m-d H:i:s'),
            'total_price' => $order->getTotalePrice(),
        ];

        return new JsonResponse($orderDetails, Response::HTTP_OK);
    }

    #[Route('/api/carts', methods: ['DELETE'])]
    public function deleteCart(Request $request): JsonResponse
    {
        $username = $this->getUsernameFromToken($request);
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        if (!$user) {
            return new JsonResponse([
                'message' => 'User not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $cart = $this->entityManager->getRepository(Cart::class)->findOneBy(['user' => $user]);

        if (!$cart) {
            return new JsonResponse([
                'message' => 'Cart not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $cartProducts = $cart->getItems();

        $cartDetails = [];

        if ($cartProducts) {
            foreach ($cartProducts as $cartProduct) {
                $cartProduct->setIsInCart(false);
                $this->entityManager->persist($cartProduct);

                $cartDetails[] = [
                    'product_id' => $cartProduct->getProduct()->getId(),
                    'name' => $cartProduct->getProduct()->getName(),
                    'quantity' => $cartProduct->getQuantity(),
                    'is_in_cart' => $cartProduct->getIsInCart(),
                ];
            }
            $this->entityManager->flush();
        }

        return new JsonResponse([
            'message' => 'Cart deleted successfully',
            'cart_details' => $cartDetails,
        ], Response::HTTP_OK);
    }

    private function getUsernameFromToken(Request $request): string
    {
        $authHeader = $request->headers->get('Authorization');
        $jwtString = str_replace('Bearer ', '', $authHeader);
        $decodedJwtToken = $this->jwtEncoder->decode($jwtString);

        return $decodedJwtToken['username'];
    }
}
