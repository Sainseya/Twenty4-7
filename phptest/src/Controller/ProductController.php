<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Catalog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends AbstractController
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    /**
     * Add a product
     */
    #[Route('/api/products', name: 'app_product_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setStatus('available');
        $product->setQuantity($data['quantity']);
        $product->setPhoto($data['photo']);
        $product->setPrice($data['price']);
        $product->setCreatedAt(new \DateTime());

        $catalogRepository = $this->doctrine->getRepository(Catalog::class);
        $catalog = $catalogRepository->findOneBy(['type' => $data['catalog_name']]);

        if (!$catalog) {
            return $this->json([
                'message' => 'Catalog not found!',
            ], 404);
        }

        $product->setCatalog($catalog);

        $em = $this->doctrine->getManager();
        $em->persist($product);
        $em->flush();

        return $this->json([
            'message' => 'Product created successfully!',
            'product' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'status' => $product->getStatus(),
                'quantity' => $product->getQuantity(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
                'catalog' => $product->getCatalog()->getId(),
                'created_at' => $product->getCreatedAt(),
            ],
        ]);
    }

    /**
     * Get a product by his id
     */
    #[Route('/api/products/{productId}', name: 'app_product_show', methods: ['GET'])]
    public function getProduct($productId): JsonResponse
    {
        $productRepository = $this->doctrine->getRepository(Product::class);
        $product = $productRepository->find($productId);

        if (!$product) {
            return $this->json([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'product' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'status' => $product->getStatus(),
                'quantity' => $product->getQuantity(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
                'catalog' => [
                    'id' => $product->getCatalog()->getId(),
                    'type' => $product->getCatalog()->getType(),
                    'bio' => $product->getCatalog()->getBio(),
                ],
                'created_at' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Get a product by his catalog id
     */
    #[Route('/api/products/{catalogId}/products', name: 'app_catalog_products', methods: ['GET'])]
    public function getProductsInCatalog($catalogId): JsonResponse
    {
        $productRepository = $this->doctrine->getRepository(Product::class);
        $products = $productRepository->findBy(['catalog' => $catalogId]);

        if (empty($products)) {
            return new JsonResponse([
                'message' => 'No products found in this catalog!',
            ], Response::HTTP_NOT_FOUND);
        }

        $productArray = [];
        foreach ($products as $product) {
            $productArray[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'status' => $product->getStatus(),
                'quantity' => $product->getQuantity(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
                'created_at' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse([
            'products' => $productArray,
        ], Response::HTTP_OK);
    }

    /**
     * Get all products
     */
    #[Route('/api/products', name: 'app_products_list', methods: ['GET'])]
    public function getAllProducts(): JsonResponse
    {
        $productRepository = $this->doctrine->getRepository(Product::class);
        $products = $productRepository->findAll();

        if (empty($products)) {
            return new JsonResponse([
                'message' => 'No products found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $productArray = [];
        foreach ($products as $product) {
            $productArray[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'status' => $product->getStatus(),
                'quantity' => $product->getQuantity(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
                'catalog' => [
                    'id' => $product->getCatalog()->getId(),
                    'type' => $product->getCatalog()->getType(),
                    'bio' => $product->getCatalog()->getBio(),
                ],
                'created_at' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse([
            'products' => $productArray,
        ], Response::HTTP_OK);
    }

    /**
     * Delete a product by his Id
     */
    #[Route('/api/products/{productId}', name: 'app_product_delete', methods: ['DELETE'])]
    public function deleteProduct($productId): JsonResponse
    {
        $entityManager = $this->doctrine->getManager();
        $productRepository = $this->doctrine->getRepository(Product::class);
        $product = $productRepository->find($productId);

        if (!$product) {
            return new JsonResponse([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($product);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Product deleted successfully',
        ], Response::HTTP_OK);
    }

    /**
     * Update a product by his Id
     */
    #[Route('/api/products/{productId}', name: 'app_product_update', methods: ['PUT'])]
    public function updateProduct(Request $request, $productId): JsonResponse
    {
        $entityManager = $this->doctrine->getManager();
        $productRepository = $this->doctrine->getRepository(Product::class);
        $product = $productRepository->find($productId);

        if (!$product) {
            return new JsonResponse([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['status'])) {
            $product->setStatus($data['status']);
        }
        if (isset($data['quantity'])) {
            $product->setQuantity($data['quantity']);
        }
        if (isset($data['photo'])) {
            $product->setPhoto($data['photo']);
        }
        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }
        if (isset($data['catalog_id'])) {
            $catalogRepository = $this->doctrine->getRepository(Catalog::class);
            $catalog = $catalogRepository->find($data['catalog_id']);
            if ($catalog) {
                $product->setCatalog($catalog);
            }
        }

        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Product updated successfully',
        ], Response::HTTP_OK);
    }

}
