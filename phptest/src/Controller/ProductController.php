<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Catalog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\Persistence\ManagerRegistry;

class ProductController extends AbstractController
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    #[Route('/product/create', name: 'app_product_create', methods: ['POST'])]
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
}
//         return $this->json([