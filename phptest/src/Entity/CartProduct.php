<?php

namespace App\Entity;

use App\Repository\CartProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartProductRepository::class)]
class CartProduct
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Cart::class)]
    #[ORM\JoinColumn(name: "cartID", referencedColumnName: "id")]
    private $cart;
    
    #[ORM\ManyToOne(targetEntity: Product::class)]
    #[ORM\JoinColumn(name: "productID", referencedColumnName: "id")]
    private $product;

    #[ORM\Column]
    private ?int $quantity = 1;

    #[ORM\Column(type: "boolean", options: ["default" => true])]
    private $isInCart = true;

    public function getIsInCart(): ?bool
    {
        return $this->isInCart;
    }

    public function setIsInCart(bool $isInCart): self
    {
        $this->isInCart = $isInCart;

        return $this;
    }

    public function getItem(int $productId): ?CartProduct
    {
        if ($this->product !== null) {
            foreach ($this->product as $item) {
                if ($item->getProduct()->getId() === $productId) {
                    return $item;
                }
            }
        }
        return null;
    }

    public function removeItem(CartProduct $itemToRemove): void
    {
        $this->product->removeElement($itemToRemove);
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    // Add getter and setter for the Cart object

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(?Cart $cart): self
    {
        $this->cart = $cart;

        return $this;
    }

    // Add getter and setter for the Product object

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
}