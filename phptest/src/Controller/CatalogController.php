<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Catalog;
use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;

class CatalogController extends AbstractController
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    #[Route('/api/catalog/create', name: 'app_catalog_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        

        $catalog = new Catalog();
        $catalog->setType($data['type']);
        $catalog->setBio($data['bio']);

        $em = $this->doctrine->getManager();
        $em->persist($catalog);
        $em->flush();

        return $this->json([
            'message' => 'Catalog created successfully!',
            'catalog' => [
                'id' => $catalog->getId(),
                'type' => $catalog->getType(),
                'bio' => $catalog->getBio(),
            ],
        ]);
    }

    #[Route('/api/catalog/{id}/products', name: 'app_catalog_products', methods: ['GET'])]
    public function getProducts(int $id): JsonResponse
    {
        $catalog = $this->doctrine->getRepository(Catalog::class)->find($id);

        if (!$catalog) {
            return $this->json([
                'message' => 'Catalog not found!',
            ], 404);
        }

        $products = $catalog->getProducts();

        $productData = [];
        foreach ($products as $product) {
            $productData[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'status' => $product->getStatus(),
                'quantity' => $product->getQuantity(),
                'photo' => $product->getPhoto(),
                'price' => $product->getPrice(),
                'created_at' => $product->getCreatedAt(),
            ];
        }

        return $this->json([
            'message' => 'Here are all the products for the catalog!',
            'products' => $productData,
        ]);
    }

    /**
     * Get all products
     */
    #[Route('/api/catalog', methods: ['GET'])]
    public function getAllCatalog(): JsonResponse
    {
        $catalogRepository = $this->doctrine->getRepository(Catalog::class);
        $catalog = $catalogRepository->findAll();

        if (empty($catalog)) {
            return new JsonResponse([
                'message' => 'No products found!',
            ], Response::HTTP_NOT_FOUND);
        }

        $productArray = [];
        foreach ($catalog as $item) {
            $catalogArray[] = [
                'id' => $item->getId(),
                'type' => $item->getType(),
                'bio' => $item->getBio(),
            ];
        }

        return new JsonResponse([
            'catalogs' => $catalogArray,
        ], Response::HTTP_OK);
    }

}